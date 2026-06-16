/** Shared shape of an organization row as selected for the dashboard. */
export interface OrgRow {
  id: string;
  name: string;
  api_key: string;
  domain_whitelist: string[];
  impressum_text: string;
  subscription_status: "active" | "past_due" | "canceled";
  subscription_plan: string | null;
  avv_accepted_at: string | null;
}
