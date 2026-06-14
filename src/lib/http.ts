/** JSON response helpers with consistent error shape. */

export type ErrorCode =
  | "invalid_payload"
  | "invalid_api_key"
  | "origin_not_allowed"
  | "payment_required"
  | "rate_limited"
  | "email_unavailable"
  | "internal_error";

export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

export function errorJson(
  code: ErrorCode,
  status: number,
  message?: string,
  headers: Record<string, string> = {}
): Response {
  return json({ ok: false, error: code, message }, status, headers);
}
