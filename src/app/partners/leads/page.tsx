"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Plus, Search } from "lucide-react";

interface Lead {
  id: string;
  prospect_company_name: string;
  prospect_ein: string;
  prospect_contact_name: string;
  prospect_contact_email: string;
  submission_source: string;
  status: string;
  submitted_at: string;
  acceptance_deadline: string | null;
  commission_end_date: string | null;
  partner_name?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  qualified: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
  expired: "bg-gray-100 text-gray-600",
  denied: "bg-red-100 text-red-800",
};

export default function LeadsPipelinePage() {
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get("status") || "all");
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: pu } = await supabase
        .from("partner_users")
        .select("is_apaly_team, organization_id")
        .eq("user_id", session.user.id)
        .single();

      setIsAdmin(pu?.is_apaly_team || false);

      let query = supabase
        .from("leads")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (!pu?.is_apaly_team && pu?.organization_id) {
        query = query.eq("organization_id", pu.organization_id);
      }

      const { data } = await query;
      setLeads(data || []);
      setLoading(false);
    }
    load();
  }, []);

  function getDeadlineDisplay(lead: Lead) {
    if (lead.status !== "qualified" || !lead.acceptance_deadline) return null;
    const deadline = new Date(lead.acceptance_deadline);
    const now = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const color = daysLeft > 30 ? "text-green-600" : daysLeft > 14 ? "text-orange-500" : "text-red-600";
    const dateStr = deadline.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return <span className={`text-xs font-medium ${color}`}>{daysLeft} days left ({dateStr})</span>;
  }

  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search && !l.prospect_company_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#102a4c]">Lead Pipeline</h1>
        {!isAdmin && (
          <Link
            href="/partners/leads/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Submit Lead
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company name..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="qualified">Qualified</option>
          <option value="customer">Customer</option>
          <option value="expired">Expired</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Source</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Submitted</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Deadline</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    No leads found.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#102a4c]">{lead.prospect_company_name}</div>
                      {lead.prospect_ein && <div className="text-xs text-gray-400">{lead.prospect_ein}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div>{lead.prospect_contact_name}</div>
                      <div className="text-xs text-gray-400">{lead.prospect_contact_email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        lead.submission_source === "referral_link"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {lead.submission_source === "referral_link" ? "Referral" : "Manual"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[lead.status] || ""}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(lead.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {getDeadlineDisplay(lead)}
                      {lead.status === "customer" && lead.commission_end_date && (
                        <span className="text-xs text-gray-500">
                          Term ends {new Date(lead.commission_end_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/partners/leads/${lead.id}`}
                        className="text-[#ff5e00] hover:underline text-xs font-medium"
                      >
                        View
                      </Link>
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
