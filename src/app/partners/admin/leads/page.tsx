"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { CheckCircle, XCircle, UserCheck } from "lucide-react";

interface Lead {
  id: string;
  prospect_company_name: string;
  prospect_ein: string;
  prospect_contact_name: string;
  prospect_contact_email: string;
  prospect_estimated_lives: string;
  submission_source: string;
  status: string;
  submitted_at: string;
  organization_id: string;
  org_name?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  qualified: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
  expired: "bg-gray-100 text-gray-600",
  denied: "bg-red-100 text-red-800",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [denyReason, setDenyReason] = useState<Record<string, string>>({});
  const [showDenyInput, setShowDenyInput] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);
  const [showCustomerInput, setShowCustomerInput] = useState<string | null>(null);
  const [customerDate, setCustomerDate] = useState<Record<string, string>>({});

  async function loadLeads() {
    const supabase = createPartnerClient();
    const { data: allLeads } = await supabase
      .from("leads")
      .select("*")
      .order("submitted_at", { ascending: true });

    const { data: orgs } = await supabase
      .from("partner_organizations")
      .select("id, company_name");

    const orgMap = Object.fromEntries((orgs || []).map(o => [o.id, o.company_name]));
    const enriched = (allLeads || []).map(l => ({
      ...l,
      org_name: orgMap[l.organization_id] || "Unknown",
    }));

    setLeads(enriched);
    setLoading(false);
  }

  useEffect(() => { loadLeads(); }, []);

  async function approveLead(leadId: string) {
    setProcessing(leadId);
    const res = await fetch("/partners/api/admin/leads/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId }),
    });
    if (res.ok) {
      await loadLeads();
    }
    setProcessing(null);
  }

  async function denyLead(leadId: string) {
    setProcessing(leadId);
    const res = await fetch("/partners/api/admin/leads/deny", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, reason: denyReason[leadId] || "" }),
    });
    if (res.ok) {
      setShowDenyInput(null);
      await loadLeads();
    }
    setProcessing(null);
  }

  async function markCustomer(leadId: string) {
    if (!customerDate[leadId]) return;
    setProcessing(leadId);
    const res = await fetch("/partners/api/admin/leads/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, agreementDate: customerDate[leadId] }),
    });
    if (res.ok) {
      setShowCustomerInput(null);
      await loadLeads();
    }
    setProcessing(null);
  }

  const filtered = filter === "all"
    ? leads
    : leads.filter((l) => l.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pendingCount = leads.filter(l => l.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#102a4c]">
          Lead Approval Queue
          {pendingCount > 0 && (
            <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
              {pendingCount} pending
            </span>
          )}
        </h1>
      </div>

      <div className="flex gap-2">
        {["pending", "all", "qualified", "customer", "expired", "denied"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === s ? "bg-[#102a4c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Lives</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Partner</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Source</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Submitted</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
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
                    <td className="px-4 py-3 text-gray-500">{lead.prospect_estimated_lives || "-"}</td>
                    <td className="px-4 py-3 text-gray-500">{lead.org_name}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded capitalize">
                        {lead.submission_source?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(lead.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/partners/leads/${lead.id}`} className="text-[#ff5e00] hover:underline text-xs">
                          View
                        </Link>
                        {lead.status === "pending" && (
                          <>
                            <button
                              onClick={() => approveLead(lead.id)}
                              disabled={processing === lead.id}
                              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 disabled:opacity-50"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Approve
                            </button>
                            {showDenyInput === lead.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  value={denyReason[lead.id] || ""}
                                  onChange={(e) => setDenyReason(p => ({ ...p, [lead.id]: e.target.value }))}
                                  placeholder="Reason"
                                  className="px-2 py-1 border rounded text-xs w-32"
                                />
                                <button
                                  onClick={() => denyLead(lead.id)}
                                  disabled={processing === lead.id}
                                  className="text-xs text-red-600 font-medium"
                                >
                                  Confirm
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShowDenyInput(lead.id)}
                                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Deny
                              </button>
                            )}
                          </>
                        )}
                        {lead.status === "qualified" && (
                          <>
                            {showCustomerInput === lead.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="date"
                                  value={customerDate[lead.id] || ""}
                                  onChange={(e) => setCustomerDate(p => ({ ...p, [lead.id]: e.target.value }))}
                                  className="px-2 py-1 border rounded text-xs"
                                />
                                <button
                                  onClick={() => markCustomer(lead.id)}
                                  disabled={processing === lead.id || !customerDate[lead.id]}
                                  className="text-xs text-green-600 font-medium disabled:opacity-50"
                                >
                                  Confirm
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShowCustomerInput(lead.id)}
                                className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                Customer
                              </button>
                            )}
                          </>
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
