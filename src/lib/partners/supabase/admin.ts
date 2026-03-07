import { createClient } from "@supabase/supabase-js";

export function createPartnerAdminClient() {
  return createClient(
    process.env.PARTNER_SUPABASE_URL!,
    process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY!
  );
}
