import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createPartnerServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.PARTNER_SUPABASE_URL!,
    process.env.PARTNER_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
      },
    }
  );
}
