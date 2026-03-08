"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  User,
  Shield,
  Users,
  Settings,
  Upload,
  LogOut,
  Menu,
  X,
  Plus,
  Pill,
  Calculator,
  BarChart3,
  ExternalLink,
} from "lucide-react";

type UserRole = "super_admin" | "apaly_staff" | "partner_admin" | "partner_user" | null;

interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isApalyTeam: boolean;
  companyName: string;
  orgStatus: string;
}

// Public pages that don't show sidebar
const publicPaths = ["/partners", "/partners/signup"];

const knownSubpaths = ["dashboard","leads","commissions","profile","admin","signup","api","auth","reports"];

function isPublicPage(pathname: string) {
  if (publicPaths.includes(pathname)) return true;
  if (pathname.startsWith("/partners/signup/")) return true;
  // Referral link: /partners/[slug] where slug is not a known route
  const slugMatch = pathname.match(/^\/partners\/([^/]+)$/);
  if (slugMatch && !knownSubpaths.includes(slugMatch[1])) return true;
  return false;
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPublic = isPublicPage(pathname);

  useEffect(() => {
    async function loadUser() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      const { data: partnerUser } = await supabase
        .from("partner_users")
        .select("first_name, last_name, email, role, is_apaly_team, organization_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (partnerUser) {
        let companyName = "";
        let orgStatus = "";
        if (partnerUser.is_apaly_team) {
          companyName = "ApalyRx";
          orgStatus = "active";
        } else if (partnerUser.organization_id) {
          const { data: org } = await supabase
            .from("partner_organizations")
            .select("company_name, status")
            .eq("id", partnerUser.organization_id)
            .maybeSingle();
          companyName = org?.company_name || "";
          orgStatus = org?.status || "";
        }
        setUser({
          email: partnerUser.email,
          firstName: partnerUser.first_name || "",
          lastName: partnerUser.last_name || "",
          role: partnerUser.role as UserRole,
          isApalyTeam: partnerUser.is_apaly_team || false,
          companyName,
          orgStatus,
        });
      }
      setLoading(false);
    }
    loadUser();
  }, [pathname]);

  async function handleLogout() {
    const supabase = createPartnerClient();
    await supabase.auth.signOut();
    router.push("/partners");
  }

  const partnerNavItems = [
    { href: "/partners/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/partners/leads", label: "Leads", icon: FileText },
    { href: "/partners/commissions", label: "Commissions", icon: DollarSign },
    ...(user?.orgStatus === "active" ? [{ href: "/partners/reports", label: "Prospect Reports", icon: BarChart3 }] : []),
    { href: "/partners/profile", label: "My Profile", icon: User },
  ];

  const adminNavItems = [
    { href: "/partners/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/partners/admin/leads", label: "Lead Approval", icon: Shield },
    { href: "/partners/admin/partners", label: "All Partners", icon: Users },
    { href: "/partners/commissions", label: "Commissions", icon: DollarSign },
  ];

  const superAdminExtra = [
    { href: "/partners/admin/commissions", label: "Commission Import", icon: Upload },
    { href: "/partners/admin/program-settings", label: "Program Settings", icon: Pill },
    { href: "/partners/admin/settings", label: "Settings", icon: Settings },
  ];

  function getNavItems() {
    if (!user) return [];
    if (user.role === "super_admin") return [...adminNavItems, ...superAdminExtra];
    if (user.isApalyTeam) return adminNavItems;
    return partnerNavItems;
  }

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#102a4c] text-white shadow-md">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            {!isPublic && user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            <Link href="/partners/dashboard" className="flex items-center gap-2">
              <Image
                src="/apalyrx-logo-white-orange.png"
                alt="ApalyRx"
                width={120}
                height={33}
                className="h-8 w-auto"
              />
              <span className="text-sm text-[#ff5e00] font-semibold hidden sm:inline">
                Partner Portal
              </span>
            </Link>
          </div>
          {user && !isPublic && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80 hidden sm:inline">
                {user.companyName && <>{user.companyName} <span className="text-white/40">|</span> </>}{user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - only for authenticated, non-public pages */}
        {!isPublic && user && !loading && (
          <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16">
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#ff5e00]/10 text-[#ff5e00]"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
                {!user.isApalyTeam && (
                  <Link
                    href="/partners/leads/new"
                    className="flex items-center gap-2 mt-4 px-3 py-2.5 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Submit Lead
                  </Link>
                )}
                <a
                  href="/calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 mt-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  Commission Calculator
                  <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                </a>
              </nav>
            </aside>

            {/* Mobile sidebar overlay */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 lg:hidden">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <aside className="absolute left-0 top-16 bottom-0 w-60 bg-white border-r border-gray-200 z-50">
                  <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-[#ff5e00]/10 text-[#ff5e00]"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                    {!user.isApalyTeam && (
                      <Link
                        href="/partners/leads/new"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 mt-4 px-3 py-2.5 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Submit Lead
                      </Link>
                    )}
                    <a
                      href="/calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 mt-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Calculator className="w-4 h-4" />
                      Commission Calculator
                      <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                    </a>
                  </nav>
                </aside>
              </div>
            )}
          </>
        )}

        {/* Main content */}
        <main className={`flex-1 ${!isPublic && user ? "p-6" : ""}`}>
          {loading && !isPublic ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
