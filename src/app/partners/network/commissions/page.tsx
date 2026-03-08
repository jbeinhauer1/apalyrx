"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Download } from "lucide-react";

interface SubOrg {
  id: string;
  company_name: string;
  partner_code: string;
}

interface CommEntry {
  id: string;
  organization_id: string;
  period_month: string;
  program_admin_fee: number;
  value_based_fee: number;
  total_commissionable: number;
  commission_rate_applied: number;
  commission_amount: number;
  customer_name: string | null;
  script_id: string | null;
  drug_brand_name: string | null;
  drug_generic_name: string | null;
  fulfillment_date: string | null;
  apalyrx_fee: number | null;
  import_source: string;
}

export default function NetworkCommissionsPage() {
  const searchParams = useSearchParams();
  const preselectedOrg = searchParams.get("org") || "";
  const [subOrgs, setSubOrgs] = useState<SubOrg[]>([]);
  const [entries, setEntries] = useState<CommEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState(preselectedOrg);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: pu } = await supabase
        .from("partner_users")
        .select("organization_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!pu?.organization_id) { setLoading(false); return; }

      const { data: children } = await supabase
        .from("partner_organizations")
        .select("id, company_name, partner_code")
        .eq("parent_organization_id", pu.organization_id)
        .order("company_name");

      setSubOrgs(children || []);

      // If we have sub-orgs, select first or preselected
      const orgs = children || [];
      if (orgs.length > 0) {
        const sel = preselectedOrg && orgs.find(o => o.id === preselectedOrg) ? preselectedOrg : orgs[0].id;
        setSelectedOrg(sel);
      }

      setLoading(false);
    }
    load();
  }, [preselectedOrg]);

  useEffect(() => {
    if (!selectedOrg) return;
    async function loadEntries() {
      const supabase = createPartnerClient();
      const { data } = await supabase
        .from("commission_entries")
        .select("id, organization_id, period_month, program_admin_fee, value_based_fee, total_commissionable, commission_rate_applied, commission_amount, customer_name, script_id, drug_brand_name, drug_generic_name, fulfillment_date, apalyrx_fee, import_source")
        .eq("organization_id", selectedOrg)
        .order("period_month", { ascending: false });
      setEntries(data || []);
    }
    loadEntries();
  }, [selectedOrg]);

  function downloadCSV() {
    const org = subOrgs.find(o => o.id === selectedOrg);
    const headers = ["Period","Customer","Script ID","Drug Brand","Drug Generic","Fulfillment Date","Admin Fee","Value-Based Fee","Total","Rate","Commission","Source"];
    const rows = entries.map(e => [
      e.period_month,
      e.customer_name || "",
      e.script_id || "",
      e.drug_brand_name || "",
      e.drug_generic_name || "",
      e.fulfillment_date || "",
      e.program_admin_fee,
      e.value_based_fee,
      e.total_commissionable,
      e.commission_rate_applied,
      e.commission_amount,
      e.import_source,
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `commissions-${org?.partner_code || "suborg"}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalCommission = entries.reduce((s, e) => s + Number(e.commission_amount || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#102a4c]">Network Commissions</h1>
        {entries.length > 0 && (
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        )}
      </div>

      {/* Sub-org tabs */}
      {subOrgs.length > 0 && (
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {subOrgs.map(org => (
            <button
              key={org.id}
              onClick={() => setSelectedOrg(org.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                selectedOrg === org.id ? "bg-white text-[#102a4c] shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {org.company_name || org.partner_code}
            </button>
          ))}
        </div>
      )}

      {/* Summary */}
      {selectedOrg && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Total Commissions — {subOrgs.find(o => o.id === selectedOrg)?.company_name}</div>
          <div className="text-3xl font-bold text-[#102a4c]">
            ${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Period</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Script ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Drug</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Admin Fee</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">VB Fee</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Rate</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No commission entries for this organization.
                  </td>
                </tr>
              ) : (
                entries.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{e.period_month}</td>
                    <td className="px-4 py-3">{e.customer_name || "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.script_id || "—"}</td>
                    <td className="px-4 py-3">
                      {e.drug_brand_name || e.drug_generic_name || "—"}
                      {e.drug_brand_name && e.drug_generic_name && (
                        <div className="text-[10px] text-gray-400">{e.drug_generic_name}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">${Number(e.program_admin_fee).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">${Number(e.value_based_fee).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{Number(e.commission_rate_applied).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">${Number(e.commission_amount).toFixed(2)}</td>
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
