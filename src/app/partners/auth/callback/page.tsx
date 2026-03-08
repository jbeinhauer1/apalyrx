"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const supabase = createPartnerClient();

    async function handleCallback() {
      // 1. Try PKCE code exchange (?code= query param)
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          router.replace("/partners?error=auth_failed");
          return;
        }
      }

      // 2. The browser client auto-detects hash fragments (#access_token=...)
      //    and establishes the session. Give it a moment then check.
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        await updateLastLogin(supabase, session.user.id);
        router.replace("/partners/dashboard");
        return;
      }

      // 3. If session isn't ready yet (hash fragment processing is async),
      //    listen for the auth state change.
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === "SIGNED_IN" && session) {
            await updateLastLogin(supabase, session.user.id);
            subscription.unsubscribe();
            router.replace("/partners/dashboard");
          }
        }
      );

      // Timeout fallback — if nothing happens after 10s, send to login
      setTimeout(() => {
        subscription.unsubscribe();
        router.replace("/partners?error=auth_failed");
      }, 10000);
    }

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f5f7]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-sm">Verifying your account...</p>
      </div>
    </div>
  );
}

async function updateLastLogin(supabase: ReturnType<typeof createPartnerClient>, userId: string) {
  await supabase
    .from("partner_users")
    .update({ last_login: new Date().toISOString() })
    .eq("user_id", userId);
}
