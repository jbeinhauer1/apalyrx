"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";

interface Partner {
  id: string;
  partner_code: string;
  company_name: string;
  status: string;
  commission_rate: number | null;
  commission_duration_months: number;
  created_at: string;
  leads_count?: number;
  qualified_count?: number;
  total_commission?: number;
  ytd_commission?: number;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
  denied: "bg-orange-100 text-orange-800",
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();

      const { data: orgs } = await supabase
        .from("partner_organizations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!orgs) { setLoading(false); return; }

      // Get lead counts and commission totals per org
      const [leadsRes, commissionsRes] = await Promise.all([
        supabase.from("leads").select("organization_id, status"),
        supabase.from("commission_entries").select("organization_id, commission_amount, period_month"),
      ]);

      const thisYear = new Date().getFullYear().toString();

      const enriched = orgs.map((org) => {
        const orgLeads = leadsRes.data?.filter(l => l.organization_id === org.id) || [];
        const orgComm = commissionsRes.data?.filter(c => c.organization_id === org.id) || [];
        return {
          ...org,
          leads_count: orgLeads.length,
          qualified_count: orgLeads.filter(l => l.status === "qualified").length,
          total_commission: orgComm.reduce((s, c) => s + Number(c.commission_amount || 0), 0),
          ytd_commission: orgComm
            .filter(c => c.period_month?.startsWith(thisYear))
            .reduce((s, c) => s + Number(c.commission_amount || 0), 0),
        };
      });

      setPartners(enriched);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAction(partnerId: string, action: string, confirmMsg: string) {
    if (!confirm(confirmMsg)) return;
    setActionLoading(partnerId);
    const res = await fetch("/partners/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, partnerId }),
    });
    const data = await res.json();
    if (res.ok && data.status) {
      setPartners(prev => prev.map(p => p.id === partnerId ? { ...p, status: data.status } : p));
    } else if (!res.ok) {
      alert(data.error || "Action failed.");
    }
    setActionLoading(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-[#102a4c]">All Partners</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Code</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Rate</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Duration</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Leads</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Qualified</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Comm. Total</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Comm. YTD</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{p.partner_code}</td>
                  <td className="px-4 py-3 font-medium text-[#102a4c]">{p.company_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{p.commission_rate ? `${p.commission_rate}%` : "-"}</td>
                  <td className="px-4 py-3 text-right">{p.commission_duration_months}mo</td>
                  <td className="px-4 py-3 text-right">{p.leads_count}</td>
                  <td className="px-4 py-3 text-right">{p.qualified_count}</td>
                  <td className="px-4 py-3 text-right">${(p.total_commission || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">${(p.ytd_commission || 0).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {actionLoading === p.id ? (
                        <span className="text-xs text-gray-400">Working...</span>
                      ) : (
                        <>
                          {p.status === "pending" && (
                            <>
                              <button onClick={() => handleAction(p.id, "approve", "Approve this partner? They will be notified by email.")} className="px-2 py-0.5 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                              <button onClick={() => handleAction(p.id, "deny", "Deny this partner?")} className="px-2 py-0.5 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700">Deny</button>
                            </>
                          )}
                          {p.status === "active" && (
                            <button onClick={() => handleAction(p.id, "suspend", "Suspend this partner?")} className="px-2 py-0.5 text-xs font-medium bg-orange-500 text-white rounded hover:bg-orange-600">Suspend</button>
                          )}
                          {(p.status === "suspended" || p.status === "denied") && (
                            <button onClick={() => handleAction(p.id, "activate", "Activate this partner?")} className="px-2 py-0.5 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700">Activate</button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/partners/admin/partners/${p.id}`} className="text-[#ff5e00] hover:underline text-xs font-medium">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
