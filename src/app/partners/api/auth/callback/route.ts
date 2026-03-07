import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/partners/dashboard";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.PARTNER_SUPABASE_URL!,
      process.env.PARTNER_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: (name: string, value: string, options: Record<string, unknown>) => {
            cookieStore.set({ name, value, ...options });
          },
          remove: (name: string, options: Record<string, unknown>) => {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Update last_login
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase
          .from("partner_users")
          .update({ last_login: new Date().toISOString() })
          .eq("user_id", session.user.id);
      }
      return NextResponse.redirect(new URL(redirect, origin));
    }
  }

  return NextResponse.redirect(new URL("/partners?error=auth_failed", origin));
}
