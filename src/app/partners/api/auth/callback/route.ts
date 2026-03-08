import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/partners/dashboard";

  // PKCE flow: ?code= query parameter present
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
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase
          .from("partner_users")
          .update({ last_login: new Date().toISOString() })
          .eq("user_id", session.user.id);
      }
      return NextResponse.redirect(new URL(redirect, origin));
    }

    return NextResponse.redirect(new URL("/partners?error=auth_failed", origin));
  }

  // Implicit flow: #access_token in hash fragment (not visible server-side).
  // Return an HTML page with inline JS to read the hash and set the session.
  const supabaseUrl = process.env.NEXT_PUBLIC_PARTNER_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_PARTNER_SUPABASE_ANON_KEY!;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Verifying your account...</title>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
</head>
<body style="margin:0;background:#f4f5f7;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;">
  <div style="text-align:center;">
    <div style="width:32px;height:32px;border:4px solid #ff5e00;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 16px;"></div>
    <p style="color:#6b7280;font-size:14px;" id="status">Verifying your account...</p>
  </div>
  <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
  <script>
    (async function() {
      var status = document.getElementById('status');
      try {
        var hash = window.location.hash.substring(1);
        if (!hash) {
          status.textContent = 'Redirecting...';
          window.location.href = '/partners?error=auth_failed';
          return;
        }
        var params = new URLSearchParams(hash);
        var accessToken = params.get('access_token');
        var refreshToken = params.get('refresh_token');
        if (!accessToken || !refreshToken) {
          status.textContent = 'Redirecting...';
          window.location.href = '/partners?error=auth_failed';
          return;
        }
        var supabase = window.supabase.createClient(
          '${supabaseUrl}',
          '${supabaseAnonKey}'
        );
        var result = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        if (result.error) {
          status.textContent = 'Verification failed. Redirecting...';
          window.location.href = '/partners?error=auth_failed';
          return;
        }
        // Update last_login
        if (result.data.session) {
          await supabase.from('partner_users')
            .update({ last_login: new Date().toISOString() })
            .eq('user_id', result.data.session.user.id);
        }
        status.textContent = 'Verified! Redirecting to dashboard...';
        window.location.href = '/partners/dashboard';
      } catch (e) {
        status.textContent = 'Something went wrong. Redirecting...';
        window.location.href = '/partners?error=auth_failed';
      }
    })();
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
