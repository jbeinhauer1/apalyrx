"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Copy, Check, Plus, Users, Pause, Play, DollarSign } from "lucide-react";

interface SubOrg {
  id: string;
  company_name: string;
  partner_code: string;
  status: string;
  created_at: string;
  leadCount: number;
  commissionTotal: number;
}

export default function NetworkPage() {
  const [subOrgs, setSubOrgs] = useState<SubOrg[]>([]);
  const [loading, setLoading] = useState(true);
  const [partnerCode, setPartnerCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteCompany, setInviteCompany] = useState("");
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState("");
  const [orgId, setOrgId] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: pu } = await supabase
        .from("partner_users")
        .select("organization_id, role")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!pu?.organization_id) { setLoading(false); return; }
      setOrgId(pu.organization_id);

      const { data: org } = await supabase
        .from("partner_organizations")
        .select("partner_code")
        .eq("id", pu.organization_id)
        .maybeSingle();
      setPartnerCode(org?.partner_code || "");

      // Get sub-orgs
      const { data: children } = await supabase
        .from("partner_organizations")
        .select("id, company_name, partner_code, status, created_at")
        .eq("parent_organization_id", pu.organization_id)
        .order("created_at", { ascending: false });

      if (!children || children.length === 0) {
        setSubOrgs([]);
        setLoading(false);
        return;
      }

      // Get leads and commissions for each sub-org
      const childIds = children.map(c => c.id);
      const [leadsRes, commissionsRes] = await Promise.all([
        supabase.from("leads").select("id, organization_id").in("organization_id", childIds),
        supabase.from("commission_entries").select("organization_id, commission_amount").in("organization_id", childIds),
      ]);

      const leadCounts: Record<string, number> = {};
      const commTotals: Record<string, number> = {};
      (leadsRes.data || []).forEach(l => { leadCounts[l.organization_id] = (leadCounts[l.organization_id] || 0) + 1; });
      (commissionsRes.data || []).forEach(c => { commTotals[c.organization_id] = (commTotals[c.organization_id] || 0) + Number(c.commission_amount || 0); });

      setSubOrgs(children.map(c => ({
        ...c,
        leadCount: leadCounts[c.id] || 0,
        commissionTotal: commTotals[c.id] || 0,
      })));
      setLoading(false);
    }
    load();
  }, []);

  async function handleInvite() {
    if (!inviteEmail) { setMessage("Email is required."); return; }
    setInviting(true);
    setMessage("");
    try {
      const res = await fetch("/partners/api/invite-suborg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, companyName: inviteCompany }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Invitation sent!");
        setInviteEmail("");
        setInviteCompany("");
        setShowInvite(false);
        // Refresh
        window.location.reload();
      } else {
        setMessage(data.error || "Failed to send invite.");
      }
    } catch {
      setMessage("Failed to send invite.");
    }
    setInviting(false);
  }

  async function toggleStatus(subOrgId: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    const supabase = createPartnerClient();
    await supabase
      .from("partner_organizations")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", subOrgId)
      .eq("parent_organization_id", orgId);
    setSubOrgs(prev => prev.map(o => o.id === subOrgId ? { ...o, status: newStatus } : o));
  }

  const statusColor: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    suspended: "bg-red-100 text-red-800",
    invited: "bg-purple-100 text-purple-800",
    denied: "bg-gray-100 text-gray-600",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const signupLink = `https://www.apalyrx.com/partners/signup?ref=${partnerCode}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#102a4c]">Network</h1>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90"
        >
          <Plus className="w-4 h-4" />
          Invite Sub-Organization
        </button>
      </div>

      {/* Links section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sub-org signup link */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-[#102a4c] mb-2">Your Sub-Organization Signup Link</h3>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            Share this link with other benefits consulting firms or sales organizations you work with.
            When they sign up using this link, their account will be linked to your partner network,
            allowing you to track their leads and commissions in one place.
          </p>
          <code className="block bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-200 text-[#102a4c] mb-3 break-all">
            {signupLink}
          </code>
          <button
            onClick={() => { navigator.clipboard.writeText(signupLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Link"}
          </button>
          <p className="text-[11px] text-orange-600 mt-3 leading-relaxed">
            Note: This link is for partner organizations only — not for employer prospects.
            To refer an employer prospect, use your referral link instead.
          </p>
        </div>

        {/* Employer referral link */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-[#102a4c] mb-2">Your Employer Referral Link</h3>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            Share this link with employer prospects. When they fill out the form,
            you&apos;ll be automatically credited as the referring partner.
          </p>
          <code className="block bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-200 text-[#102a4c] mb-3 break-all">
            {`https://www.apalyrx.com/partners/${partnerCode}`}
          </code>
          <button
            onClick={() => { navigator.clipboard.writeText(`https://www.apalyrx.com/partners/${partnerCode}`); setCopiedReferral(true); setTimeout(() => setCopiedReferral(false), 2000); }}
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
          >
            {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedReferral ? "Copied" : "Copy Link"}
          </button>
        </div>
      </div>

      {message && (
        <div className={`rounded-lg p-3 text-sm ${message.includes("fail") ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
          {message}
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md mx-4 space-y-4">
            <h2 className="text-lg font-bold text-[#102a4c]">Invite Sub-Organization</h2>
            <p className="text-xs text-gray-500">They&apos;ll receive an email with a personalized registration link.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email *</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
                placeholder="admin@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={inviteCompany}
                onChange={(e) => setInviteCompany(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
                placeholder="Optional"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowInvite(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={inviting || !inviteEmail}
                className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90 disabled:opacity-50"
              >
                {inviting ? "Sending..." : "Send Invite"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-orgs table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Organization</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Partner Code</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Leads</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Commissions</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Joined</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subOrgs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No sub-organizations yet.</p>
                    <p className="text-gray-400 text-xs mt-1">Invite partners to join your network.</p>
                  </td>
                </tr>
              ) : (
                subOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#102a4c]">{org.company_name || "—"}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{org.partner_code || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColor[org.status] || ""}`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{org.leadCount}</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">
                      ${org.commissionTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/partners/network/commissions?org=${org.id}`}
                          className="text-[#ff5e00] hover:underline text-xs font-medium flex items-center gap-1"
                        >
                          <DollarSign className="w-3 h-3" /> Details
                        </Link>
                        {(org.status === "active" || org.status === "suspended") && (
                          <button
                            onClick={() => toggleStatus(org.id, org.status)}
                            className={`text-xs flex items-center gap-1 ${org.status === "active" ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}`}
                          >
                            {org.status === "active" ? <><Pause className="w-3 h-3" /> Suspend</> : <><Play className="w-3 h-3" /> Reactivate</>}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
