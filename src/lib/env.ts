/**
 * Centralized environment access. Throws early (at first use) if a required
 * secret is missing, instead of failing deep inside a request.
 */
function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function opt(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const env = {
  appUrl: () => opt("NEXT_PUBLIC_APP_URL", "http://localhost:3000").replace(/\/$/, ""),

  supabaseUrl: () => req("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: () => req("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceKey: () => req("SUPABASE_SERVICE_ROLE_KEY"),

  upstashUrl: () => opt("UPSTASH_REDIS_REST_URL"),
  upstashToken: () => opt("UPSTASH_REDIS_REST_TOKEN"),

  resendKey: () => req("RESEND_API_KEY"),
  emailFrom: () => req("EMAIL_FROM"),
  emailBccOwner: () => opt("EMAIL_BCC_SHOP_OWNER") === "true",

  fieldKey: () => req("FIELD_ENCRYPTION_KEY"),

  tsaUrl: () => opt("TSA_URL", "http://timestamp.digicert.com"),
  cronSecret: () => req("CRON_SECRET"),
  paymentsWebhookSecret: () => req("PAYMENTS_WEBHOOK_SECRET"),

  retentionDays: () => parseInt(opt("DATA_RETENTION_DAYS", "180"), 10),

  lsApiKey: () => opt("LS_API_KEY"),
};
