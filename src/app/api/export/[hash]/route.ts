/**
 * GET /api/export/{hash} — court evidence export (Phase 5).
 *
 * Authenticated dashboard endpoint. Produces a ZIP for one withdrawal:
 *   - withdrawal.json  : the full log entry (PII decrypted for the shop owner)
 *   - merkle.json      : daily root + inclusion proof for this leaf
 *   - timestamp.tsr    : RFC 3161 DER token (DigiCert TSA) for the root
 *   - README.txt       : how to verify
 *
 * Ownership is enforced via RLS (the user's session can only read its own org's
 * rows); the field-decryption key is server-side only.
 */
import JSZip from "jszip";
import { supabaseServer } from "@/lib/supabase-server";
import { decryptField } from "@/lib/crypto";
import { buildMerkle, proofFor } from "@/lib/merkle";
import { json } from "@/lib/http";

export const runtime = "nodejs";

function byteaToBuffer(value: string | null): Buffer | null {
  if (!value) return null;
  const hex = value.startsWith("\\x") ? value.slice(2) : value;
  return Buffer.from(hex, "hex");
}

export async function GET(req: Request, ctx: { params: Promise<{ hash: string }> }): Promise<Response> {
  const { hash } = await ctx.params;
  const clean = (hash || "").toLowerCase().replace(/[^a-f0-9]/g, "").slice(0, 64);

  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "unauthorized" }, 401);

  // RLS ensures the row is only visible if it belongs to the caller's org.
  const { data: rec } = await supabase
    .from("withdrawal_requests")
    .select("id, org_id, consumer_name, email, order_id, timestamp_iso8601, received_at, sha256_hash, tsa_pending, anonymized_at")
    .eq("sha256_hash", clean)
    .maybeSingle();
  if (!rec) return json({ ok: false, error: "not_found" }, 404);

  const day = (rec.timestamp_iso8601 || rec.received_at).slice(0, 10);

  // Day's hashes (same org) to rebuild the tree + inclusion proof.
  const { data: dayRows } = await supabase
    .from("withdrawal_requests")
    .select("sha256_hash")
    .eq("org_id", rec.org_id)
    .gte("received_at", `${day}T00:00:00.000Z`)
    .lt("received_at", `${day}T23:59:59.999Z`);
  const hashes = (dayRows || []).map((r) => r.sha256_hash);

  let root = "";
  let proof: string[] = [];
  try {
    const m = buildMerkle(hashes);
    root = m.root;
    proof = proofFor(m.tree, clean);
  } catch {
    /* single/empty edge cases — leave proof empty */
  }

  const { data: rootRow } = await supabase
    .from("merkle_roots")
    .select("date, merkle_root_hex, tsa_token_der, tsa_pending")
    .eq("org_id", rec.org_id)
    .eq("date", day)
    .maybeSingle();

  const [name, email] = await Promise.all([
    decryptField(rec.consumer_name),
    decryptField(rec.email),
  ]);

  const zip = new JSZip();
  zip.file(
    "withdrawal.json",
    JSON.stringify(
      {
        id: rec.id,
        org_id: rec.org_id,
        consumer_name: rec.anonymized_at ? null : name,
        email: rec.anonymized_at ? null : email,
        order_id: rec.order_id,
        timestamp_iso8601: rec.timestamp_iso8601,
        sha256_hash: rec.sha256_hash,
        canonical_object: {
          email: rec.anonymized_at ? "[anonymized]" : email,
          order_id: rec.order_id,
          shop_id: rec.org_id,
          timestamp_iso8601: rec.timestamp_iso8601,
        },
        anonymized_at: rec.anonymized_at,
      },
      null,
      2
    )
  );
  zip.file(
    "merkle.json",
    JSON.stringify(
      {
        date: day,
        leaf: "0x" + clean,
        merkle_root: rootRow?.merkle_root_hex || root,
        proof,
        algorithm: "SimpleMerkleTree (commutative keccak256) over SHA-256 leaves",
        tsa_pending: rootRow?.tsa_pending ?? true,
      },
      null,
      2
    )
  );

  const tsr = byteaToBuffer(rootRow?.tsa_token_der ?? null);
  if (tsr) zip.file("timestamp.tsr", tsr);

  zip.file(
    "README.txt",
    [
      "Court evidence bundle — Widerrufsbutton DACH (§ 356a BGB)",
      "",
      "1. withdrawal.json  — the original request + the canonical object that was hashed.",
      "2. merkle.json      — recompute SHA-256 over the canonical object, confirm it equals 'leaf',",
      "                      then verify 'proof' against 'merkle_root'.",
      "3. timestamp.tsr    — RFC 3161 timestamp token over the Merkle root (verify with OpenSSL:",
      "                      `openssl ts -reply -in timestamp.tsr -text`).",
      "",
      "Together these prove the withdrawal existed and was received at the stated time,",
      "and that the record has not been altered since notarization.",
    ].join("\n")
  );

  const blob = await zip.generateAsync({ type: "uint8array" });
  return new Response(blob as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="evidence-${clean.slice(0, 12)}.zip"`,
    },
  });
}
