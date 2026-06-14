/**
 * POST /api/cron/merkle — daily at 23:59 UTC (see vercel.json).
 *
 * For each org with withdrawals "today" (UTC): build a Merkle tree of the day's
 * SHA-256 hashes, store the root, then notarize the root via RFC 3161 (DigiCert
 * TSA) with exponential backoff. On success the DER token is stored and
 * tsa_pending flips to false (for the root and its covered requests). On total
 * failure the root is kept with tsa_pending=true for deferred notarization.
 * The same run also retries previously pending roots.
 */
import { serviceClient } from "@/lib/supabase";
import { buildMerkle } from "@/lib/merkle";
import { requestTimestamp, withBackoff } from "@/lib/tsa";
import { env } from "@/lib/env";
import { json, errorJson } from "@/lib/http";

export const runtime = "nodejs";
export const maxDuration = 300;

function authorized(req: Request): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${env.cronSecret()}`;
}

function utcDayBounds(d = new Date()): { day: string; start: string; end: string } {
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return { day: start.toISOString().slice(0, 10), start: start.toISOString(), end: end.toISOString() };
}

function toBytea(buf: Buffer): string {
  return "\\x" + buf.toString("hex");
}

async function notarize(db: ReturnType<typeof serviceClient>, orgId: string, day: string, rootHex: string) {
  try {
    const { tokenDer } = await withBackoff(() => requestTimestamp(rootHex, env.tsaUrl()), 4, 500);
    await db
      .from("merkle_roots")
      .update({ tsa_token_der: toBytea(tokenDer), tsa_pending: false })
      .eq("org_id", orgId)
      .eq("date", day);
    // Mark the day's covered requests as notarized.
    await db
      .from("withdrawal_requests")
      .update({ tsa_pending: false })
      .eq("org_id", orgId)
      .gte("received_at", `${day}T00:00:00.000Z`)
      .lt("received_at", `${day}T23:59:59.999Z`)
      .eq("tsa_pending", true);
    return true;
  } catch {
    return false; // stays tsa_pending = true
  }
}

// Vercel Cron triggers via GET; manual/admin invocation may use POST.
export async function GET(req: Request): Promise<Response> {
  return POST(req);
}

export async function POST(req: Request): Promise<Response> {
  if (!authorized(req)) return errorJson("invalid_api_key", 401, "Bad cron secret");

  const db = serviceClient();
  const { day, start, end } = utcDayBounds();
  const summary = { day, orgsProcessed: 0, rootsBuilt: 0, notarized: 0, pending: 0 };

  try {
    // 1) Today's withdrawals, grouped by org.
    const { data: rows, error } = await db
      .from("withdrawal_requests")
      .select("org_id, sha256_hash, received_at")
      .gte("received_at", start)
      .lt("received_at", end);
    if (error) return errorJson("internal_error", 500, "Query failed");

    const byOrg = new Map<string, string[]>();
    for (const r of rows || []) {
      const list = byOrg.get(r.org_id) || [];
      list.push(r.sha256_hash);
      byOrg.set(r.org_id, list);
    }

    for (const [orgId, hashes] of byOrg) {
      summary.orgsProcessed++;
      const { root } = buildMerkle(hashes);

      // Upsert the root (pending until notarized).
      const { error: upErr } = await db
        .from("merkle_roots")
        .upsert(
          { org_id: orgId, date: day, merkle_root_hex: root, tsa_pending: true },
          { onConflict: "org_id,date" }
        );
      if (upErr) continue;
      summary.rootsBuilt++;

      const ok = await notarize(db, orgId, day, root);
      ok ? summary.notarized++ : summary.pending++;
    }

    // 2) Retry previously pending roots (deferred notarization).
    const { data: pendingRoots } = await db
      .from("merkle_roots")
      .select("org_id, date, merkle_root_hex")
      .eq("tsa_pending", true)
      .neq("date", day)
      .limit(50);
    for (const pr of pendingRoots || []) {
      const ok = await notarize(db, pr.org_id, pr.date, pr.merkle_root_hex);
      if (ok) summary.notarized++;
    }

    return json({ ok: true, summary });
  } catch {
    return errorJson("internal_error", 500, "Cron failed");
  }
}
