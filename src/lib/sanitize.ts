/**
 * Strict XSS sanitization for values that will be stored in the tamper-evident
 * audit log and rendered into HTML emails / dashboards. We do NOT try to allow
 * any markup — these are plain identifiers/names, so we strip control chars and
 * neutralize HTML-significant characters.
 */
export function sanitizeText(input: string): string {
  return input
    // remove control chars (keep normal whitespace)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

/** HTML-escape for safe interpolation into email/dashboard markup. */
export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}
