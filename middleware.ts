import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle partner portal routes
  if (!pathname.startsWith("/partners")) {
    return NextResponse.next();
  }

  // Public partner routes - no auth needed
  const publicPartnerPaths = [
    "/partners/signup",
    "/partners/api/",
  ];

  // Exact match for /partners (login page)
  if (pathname === "/partners") {
    return NextResponse.next();
  }

  // Check public paths
  if (publicPartnerPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check if this is a referral link (partner slug like /partners/acme-benefits)
  const knownSubpaths = ["dashboard","leads","commissions","profile","admin","signup","api","auth","reports"];
  const slugMatch = pathname.match(/^\/partners\/([^/]+)$/);
  if (slugMatch && !knownSubpaths.includes(slugMatch[1])) {
    return NextResponse.next();
  }

  // All other /partners/* routes require auth
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.PARTNER_SUPABASE_URL!,
    process.env.PARTNER_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => request.cookies.get(name)?.value,
        set: (name: string, value: string, options: Record<string, unknown>) => {
          response.cookies.set({ name, value, ...options });
        },
        remove: (name: string, options: Record<string, unknown>) => {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = new URL("/partners", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes - require is_apaly_team
  if (pathname.startsWith("/partners/admin")) {
    const { data: partnerUser } = await supabase
      .from("partner_users")
      .select("role, is_apaly_team")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!partnerUser?.is_apaly_team) {
      return NextResponse.redirect(new URL("/partners/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/partners/:path*"],
};
