"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import {
  CheckCircle,
  Circle,
  AlertTriangle,
  FileText,
  DollarSign,
  Copy,
  Check,
  Users,
  Shield,
  Clock,
} from "lucide-react";

interface DashboardData {
  isApalyTeam: boolean;
  setupComplete: boolean;
  orgStatus: string;
  emailVerified: boolean;
  hasProfile: boolean;
  hasBanking: boolean;
  partnerCode: string;
  companyName: string;
  totalLeads: number;
  qualifiedLeads: number;
  commissionThisMonth: number;
  commissionAllTime: number;
  expiringLeads: number;
  // Admin stats
  pendingPartners?: number;
  pendingLeads?: number;
  activePartners?: number;
  totalActiveLeads?: number;
  commissionsPaidThisMonth?: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      setLoading(false);
      setError("Dashboard took too long to load. Please refresh the page or contact support.");
    }, 5000);

    async function load() {
      try {
        const supabase = createPartnerClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setError("No active session. Please log in again.");
          return;
        }

        const { data: pu, error: puError } = await supabase
          .from("partner_users")
          .select("organization_id, is_apaly_team, role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (puError) {
          setError("Failed to load user profile. Please try again.");
          return;
        }

        if (!pu) {
          setError("Your user profile was not found. Please contact support.");
          return;
        }

        if (pu.is_apaly_team) {
          // Admin dashboard — works even if organization_id is null (super_admin)
          const [partners, leads, commissions] = await Promise.all([
            supabase.from("partner_organizations").select("id, status"),
            supabase.from("leads").select("id, status"),
            supabase.from("commission_entries").select("commission_amount, period_month"),
          ]);

          const pendingPartners = partners.data?.filter(p => p.status === "pending").length || 0;
          const activePartners = partners.data?.filter(p => p.status === "active").length || 0;
          const pendingLeads = leads.data?.filter(l => l.status === "pending").length || 0;
          const activeLeads = leads.data?.filter(l => l.status === "qualified").length || 0;

          const now = new Date();
          const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
          const monthTotal = commissions.data
            ?.filter(c => c.period_month?.startsWith(thisMonth))
            .reduce((sum, c) => sum + (Number(c.commission_amount) || 0), 0) || 0;

          if (!timedOut) {
            setData({
              isApalyTeam: true,
              setupComplete: true,
              orgStatus: "active",
              emailVerified: true,
              hasProfile: true,
              hasBanking: true,
              partnerCode: "",
              companyName: "ApalyRx Admin",
              totalLeads: leads.data?.length || 0,
              qualifiedLeads: activeLeads,
              commissionThisMonth: monthTotal,
              commissionAllTime: commissions.data?.reduce((s, c) => s + (Number(c.commission_amount) || 0), 0) || 0,
              expiringLeads: 0,
              pendingPartners,
              pendingLeads,
              activePartners,
              totalActiveLeads: activeLeads,
              commissionsPaidThisMonth: monthTotal,
            });
          }
        } else {
          // Partner dashboard
          if (!pu.organization_id) {
            setError("Your account is not linked to an organization. Please contact support.");
            return;
          }

          const { data: org } = await supabase
            .from("partner_organizations")
            .select("*")
            .eq("id", pu.organization_id)
            .maybeSingle();

          if (!org) {
            setError("Your organization was not found. Please contact support.");
            return;
          }

          const [leads, commissions] = await Promise.all([
            supabase.from("leads").select("id, status, acceptance_deadline").eq("organization_id", org.id),
            supabase.from("commission_entries").select("commission_amount, period_month").eq("organization_id", org.id),
          ]);

          const now = new Date();
          const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
          const expiringCount = leads.data?.filter(l => {
            if (l.status !== "qualified" || !l.acceptance_deadline) return false;
            const deadline = new Date(l.acceptance_deadline);
            const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            return daysLeft <= 14 && daysLeft > 0;
          }).length || 0;

          if (!timedOut) {
            setData({
              isApalyTeam: false,
              setupComplete: org.setup_complete,
              orgStatus: org.status,
              emailVerified: !!session.user.email_confirmed_at,
              hasProfile: !!(org.company_name && org.ein && org.address),
              hasBanking: !!org.account_number_last4,
              partnerCode: org.partner_code,
              companyName: org.company_name,
              totalLeads: leads.data?.length || 0,
              qualifiedLeads: leads.data?.filter(l => l.status === "qualified").length || 0,
              commissionThisMonth: commissions.data
                ?.filter(c => c.period_month?.startsWith(thisMonth))
                .reduce((s, c) => s + (Number(c.commission_amount) || 0), 0) || 0,
              commissionAllTime: commissions.data?.reduce((s, c) => s + (Number(c.commission_amount) || 0), 0) || 0,
              expiringLeads: expiringCount,
            });
          }
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
        if (!timedOut) {
          setError("Something went wrong loading the dashboard. Please refresh the page.");
        }
      } finally {
        clearTimeout(timeout);
        if (!timedOut) {
          setLoading(false);
        }
      }
    }
    load();

    return () => clearTimeout(timeout);
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(`www.apalyrx.com/partners/${data?.partnerCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center">
        <AlertTriangle className="w-10 h-10 text-orange-500 mx-auto mb-3" />
        <p className="text-sm text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#102a4c] text-white rounded-lg text-sm hover:bg-[#102a4c]/90 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (!data) return null;

  // Admin dashboard
  if (data.isApalyTeam) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-[#102a4c]">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/partners/admin/partners" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#ff5e00]" />
              <span className="text-sm text-gray-500">Pending Partner Approvals</span>
            </div>
            <span className="text-3xl font-bold text-[#102a4c]">{data.pendingPartners}</span>
          </Link>
          <Link href="/partners/admin/leads" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-[#ff5e00]" />
              <span className="text-sm text-gray-500">Pending Lead Approvals</span>
            </div>
            <span className="text-3xl font-bold text-[#102a4c]">{data.pendingLeads}</span>
          </Link>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">Active Partners</span>
            </div>
            <span className="text-3xl font-bold text-[#102a4c]">{data.activePartners}</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">Active Qualified Leads</span>
            </div>
            <span className="text-3xl font-bold text-[#102a4c]">{data.totalActiveLeads}</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">Commissions Paid (This Month)</span>
            </div>
            <span className="text-3xl font-bold text-[#102a4c]">${data.commissionsPaidThisMonth?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  // Partner dashboard
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#102a4c]">Dashboard</h1>

      {/* Setup Wizard */}
      {!data.setupComplete && (
        <div className="bg-white rounded-xl border border-orange-200 p-6">
          <h2 className="text-lg font-bold text-[#102a4c] mb-4">
            Complete Your Account Setup
          </h2>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800 mb-4">
            Your account is not active until all steps are complete and approved
            by ApalyRx.
          </div>
          <div className="space-y-3">
            {[
              { done: data.emailVerified, label: "Verify email", hint: "Check your inbox for a verification link" },
              { done: data.hasProfile, label: "Complete org profile", hint: "Add your company details", link: "/partners/profile" },
              { done: data.hasBanking, label: "Add banking info", hint: "Required for commission payments", link: "/partners/profile" },
              { done: data.orgStatus === "active", label: "Awaiting ApalyRx approval", hint: "We'll review your application shortly" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                {step.done ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <span className={`text-sm font-medium ${step.done ? "text-green-700 line-through" : "text-gray-900"}`}>
                    {step.label}
                  </span>
                  {!step.done && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {step.hint}
                      {step.link && (
                        <>
                          {" "}
                          <Link href={step.link} className="text-[#ff5e00] hover:underline">
                            Go &rarr;
                          </Link>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Total Leads</div>
          <div className="text-3xl font-bold text-[#102a4c]">{data.totalLeads}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Active Qualified</div>
          <div className="text-3xl font-bold text-[#102a4c]">{data.qualifiedLeads}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Commission (Month)</div>
          <div className="text-3xl font-bold text-[#102a4c]">${data.commissionThisMonth.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Commission (All Time)</div>
          <div className="text-3xl font-bold text-[#102a4c]">${data.commissionAllTime.toLocaleString()}</div>
        </div>
      </div>

      {/* Expiring leads warning */}
      {data.expiringLeads > 0 && (
        <Link href="/partners/leads?status=qualified" className="block bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">{data.expiringLeads} lead{data.expiringLeads > 1 ? "s" : ""} expiring within 14 days</span>
          </div>
        </Link>
      )}

      {/* Referral link */}
      {data.orgStatus === "active" && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Your Referral Link</h3>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#102a4c] border border-gray-200">
              www.apalyrx.com/partners/{data.partnerCode}
            </code>
            <button
              onClick={copyLink}
              className="flex items-center gap-1 px-3 py-2 bg-[#102a4c] text-white rounded-lg text-sm hover:bg-[#102a4c]/90 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Share this link with prospects. When they fill out the form, you&apos;ll be automatically credited.
          </p>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/partners/leads/new" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow text-center">
          <FileText className="w-6 h-6 text-[#ff5e00] mx-auto mb-2" />
          <span className="text-sm font-medium text-[#102a4c]">Submit a Lead</span>
        </Link>
        <Link href="/partners/leads" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow text-center">
          <Clock className="w-6 h-6 text-[#ff5e00] mx-auto mb-2" />
          <span className="text-sm font-medium text-[#102a4c]">View Pipeline</span>
        </Link>
        <Link href="/partners/commissions" className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow text-center">
          <DollarSign className="w-6 h-6 text-[#ff5e00] mx-auto mb-2" />
          <span className="text-sm font-medium text-[#102a4c]">View Commissions</span>
        </Link>
      </div>
    </div>
  );
}
