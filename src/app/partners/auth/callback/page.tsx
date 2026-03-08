"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";

/**
 * Client-side auth callback for email verification (implicit flow).
 *
 * Supabase email-confirmation redirects here with hash fragments
 * (#access_token=...&refresh_token=...) which are only readable
 * client-side. The Supabase browser client auto-detects them and
 * establishes a session.
 *
 * The API route at /partners/api/auth/callback handles PKCE flow
 * (?code=) used by the login page's signInWithOtp / signInWithPassword.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const supabase = createPartnerClient();

    async function handleCallback() {
      // PKCE fallback: if ?code= is present, exchange it
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          router.replace("/partners?error=auth_failed");
          return;
        }
      }

      // The browser client auto-detects #access_token=... hash fragments.
      // Check if a session is already established.
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await updateLastLogin(supabase, session.user.id);
        router.replace("/partners/dashboard");
        return;
      }

      // Hash fragment processing can be async — listen for state change
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === "SIGNED_IN" && session) {
            await updateLastLogin(supabase, session.user.id);
            subscription.unsubscribe();
            router.replace("/partners/dashboard");
          }
        }
      );

      // Timeout fallback
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

async function updateLastLogin(
  supabase: ReturnType<typeof createPartnerClient>,
  userId: string
) {
  await supabase
    .from("partner_users")
    .update({ last_login: new Date().toISOString() })
    .eq("user_id", userId);
}
