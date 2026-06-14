/**
 * Transactional receipt (durable medium per § 126b BGB). Sent via Resend's HTTP
 * API (works on the Edge runtime). To use an EU-based provider instead (Brevo,
 * etc.), swap `sendReceipt` for that provider's HTTP API — the call site is
 * provider-agnostic.
 *
 * Resend region: enforce EU sending in the Resend dashboard / domain config.
 */
import { env } from "./env";
import { escapeHtml } from "./sanitize";

export interface ReceiptData {
  name: string;
  orderId: string;
  email: string;
  receivedAtIso: string;
  hash: string;
  proofUrl: string;
  impressumText: string;
  locale: "de" | "en";
}

function renderHtml(d: ReceiptData): { subject: string; html: string; text: string } {
  const de = d.locale === "de";
  const subject = de ? "Bestätigung Ihres Widerrufs" : "Confirmation of your withdrawal";
  const L = de
    ? {
        h: "Widerruf eingegangen",
        intro: "Hiermit bestätigen wir den Eingang Ihres Widerrufs zu folgendem Vertrag:",
        name: "Name",
        order: "Bestell-/Vertragsnummer",
        time: "Eingang beim Server (ISO 8601)",
        hash: "Kryptografischer Nachweis (SHA-256)",
        proof: "Nachweis online prüfen",
        legal: "Diese E-Mail dient als dauerhafter Datenträger gemäß § 126b BGB.",
      }
    : {
        h: "Withdrawal received",
        intro: "We hereby confirm receipt of your withdrawal for the following contract:",
        name: "Name",
        order: "Order / contract number",
        time: "Received at server (ISO 8601)",
        hash: "Cryptographic proof (SHA-256)",
        proof: "Verify proof online",
        legal: "This email serves as a durable medium pursuant to § 126b BGB.",
      };

  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 12px;color:#555;white-space:nowrap">${escapeHtml(k)}</td>` +
    `<td style="padding:6px 12px;font-weight:600;word-break:break-all">${escapeHtml(v)}</td></tr>`;

  const impressum = d.impressumText
    ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
       <div style="font-size:12px;color:#777;line-height:1.5;white-space:pre-line">${escapeHtml(d.impressumText)}</div>`
    : "";

  const html = `<!doctype html><html lang="${d.locale}"><body style="margin:0;background:#f1f5f9;font-family:system-ui,Segoe UI,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:24px">
    <div style="background:#fff;border-radius:12px;padding:28px">
      <h1 style="font-size:20px;margin:0 0 12px;color:#111">${escapeHtml(L.h)}</h1>
      <p style="font-size:14px;color:#333;margin:0 0 16px">${escapeHtml(L.intro)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;background:#f8fafc;border-radius:8px">
        ${row(L.name, d.name)}
        ${row(L.order, d.orderId)}
        ${row(L.time, d.receivedAtIso)}
        ${row(L.hash, d.hash)}
      </table>
      <p style="margin:20px 0 0">
        <a href="${escapeHtml(d.proofUrl)}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600">${escapeHtml(L.proof)}</a>
      </p>
      <p style="font-size:12px;color:#777;margin:20px 0 0">${escapeHtml(L.legal)}</p>
      ${impressum}
    </div>
  </div></body></html>`;

  const text =
    `${L.h}\n\n${L.intro}\n` +
    `${L.name}: ${d.name}\n${L.order}: ${d.orderId}\n${L.time}: ${d.receivedAtIso}\n` +
    `${L.hash}: ${d.hash}\n${L.proof}: ${d.proofUrl}\n\n${L.legal}\n` +
    (d.impressumText ? `\n---\n${d.impressumText}\n` : "");

  return { subject, html, text };
}

/** Sends the receipt. Throws on non-2xx so the caller can mark email_unavailable. */
export async function sendReceipt(d: ReceiptData, bcc?: string): Promise<void> {
  const { subject, html, text } = renderHtml(d);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.emailFrom(),
      to: [d.email],
      ...(bcc && env.emailBccOwner() ? { bcc: [bcc] } : {}),
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
}
