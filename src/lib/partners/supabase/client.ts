import { createBrowserClient } from "@supabase/ssr";

export function createPartnerClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_PARTNER_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_PARTNER_SUPABASE_ANON_KEY!
  );
}
