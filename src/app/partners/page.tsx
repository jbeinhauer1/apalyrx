"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";

export default function PartnersLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-64px)] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/partners/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createPartnerClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    // Update last_login
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from("partner_users")
        .update({ last_login: new Date().toISOString() })
        .eq("user_id", session.user.id);
    }
    router.push(redirect);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createPartnerClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/partners/api/auth/callback?redirect=${redirect}`,
      },
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    setMagicLinkSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left - Value Prop */}
      <div className="hidden lg:flex flex-1 bg-[#102a4c] items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            The ApalyRx Partner Program
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            Earn commissions by introducing self-funded employers and health
            plans to the ApalyRx platform.
          </p>
          <div className="space-y-4 text-white/70 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#ff5e00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#ff5e00] text-xs font-bold">1</span>
              </div>
              <span>Submit prospects through your personalized referral link</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#ff5e00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#ff5e00] text-xs font-bold">2</span>
              </div>
              <span>Track lead status and get real-time approval updates</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#ff5e00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#ff5e00] text-xs font-bold">3</span>
              </div>
              <span>Earn recurring commissions on qualified customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[#102a4c] mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">
            Access your partner dashboard
          </p>

          {magicLinkSent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
              Check your email for a login link. You can close this tab.
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
                  {error}
                </div>
              )}

              {!useMagicLink ? (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Magic Link"}
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => setUseMagicLink(!useMagicLink)}
                className="w-full mt-3 text-sm text-gray-500 hover:text-[#ff5e00] transition-colors"
              >
                {useMagicLink
                  ? "Sign in with password instead"
                  : "Or, send me a magic link"}
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <Link
                  href="/partners/signup"
                  className="text-sm font-medium text-[#ff5e00] hover:text-[#ff5e00]/80 transition-colors"
                >
                  Create your partner account &rarr;
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
