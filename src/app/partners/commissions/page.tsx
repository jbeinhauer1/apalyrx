"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Calculator, Download, X } from "lucide-react";

interface CommissionEntry {
  id: string;
  period_month: string;
  program_admin_fee: number;
  value_based_fee: number;
  total_commissionable: number;
  commission_rate_applied: number;
  commission_amount: number;
  import_source: string;
  customer_name: string | null;
  script_id: string | null;
  drug_ndc: string | null;
  drug_brand_name: string | null;
  drug_generic_name: string | null;
  fulfillment_date: string | null;
  apalyrx_fee: number | null;
  lead?: { prospect_company_name: string } | null;
}

export default function CommissionsPage() {
  const [entries, setEntries] = useState<CommissionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setIsAdmin] = useState(false);
  const [drawerEntry, setDrawerEntry] = useState<CommissionEntry | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: pu } = await supabase
        .from("partner_users")
        .select("is_apaly_team, organization_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!pu) { setLoading(false); return; }
      setIsAdmin(pu.is_apaly_team || false);

      // RLS handles visibility (own org + sub-orgs for parent orgs)
      const { data } = await supabase
        .from("commission_entries")
        .select("*, lead:leads(prospect_company_name)")
        .order("period_month", { ascending: false });
      setEntries(data || []);
      setLoading(false);
    }
    load();
  }, []);

  function downloadCSV() {
    const headers = ["Period","Customer","Script ID","Drug Brand","Drug Generic","NDC","Fulfillment Date","Admin Fee","Value-Based Fee","Total","Rate","Commission","Source"];
    const rows = entries.map(e => [
      e.period_month,
      e.customer_name || e.lead?.prospect_company_name || "",
      e.script_id || "",
      e.drug_brand_name || "",
      e.drug_generic_name || "",
      e.drug_ndc || "",
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
    a.download = `commissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalAll = entries.reduce((s, e) => s + Number(e.commission_amount || 0), 0);
  const now = new Date();
  const thisYear = now.getFullYear().toString();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const totalYear = entries
    .filter((e) => e.period_month?.startsWith(thisYear))
    .reduce((s, e) => s + Number(e.commission_amount || 0), 0);
  const totalMonth = entries
    .filter((e) => e.period_month?.startsWith(thisMonth))
    .reduce((s, e) => s + Number(e.commission_amount || 0), 0);

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
        <h1 className="text-2xl font-bold text-[#102a4c]">Commissions</h1>
        <div className="flex items-center gap-2">
          {entries.length > 0 && (
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
          )}
          <Link
            href="/partners/commissions/calculator"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Calculator className="w-4 h-4" />
            Projection Calculator
          </Link>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Total Earned (All Time)</div>
          <div className="text-3xl font-bold text-[#102a4c]">${totalAll.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Earned This Year</div>
          <div className="text-3xl font-bold text-[#102a4c]">${totalYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500 mb-1">Earned This Month</div>
          <div className="text-3xl font-bold text-[#102a4c]">${totalMonth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Month</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Script ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Drug</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Fee</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Rate</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Commission</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No commission entries yet.
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setDrawerEntry(e)}>
                    <td className="px-4 py-3 font-medium">{e.period_month}</td>
                    <td className="px-4 py-3">{e.customer_name || e.lead?.prospect_company_name || "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.script_id || "—"}</td>
                    <td className="px-4 py-3">
                      {e.drug_brand_name || e.drug_generic_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">${Number(e.apalyrx_fee || e.program_admin_fee).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{Number(e.commission_rate_applied).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">${Number(e.commission_amount).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#ff5e00] hover:underline">Details</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Script-level detail drawer */}
      {drawerEntry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerEntry(null)} />
          <div className="relative w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#102a4c]">Commission Detail</h3>
              <button onClick={() => setDrawerEntry(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <DetailRow label="Period" value={drawerEntry.period_month} />
              <DetailRow label="Customer" value={drawerEntry.customer_name || drawerEntry.lead?.prospect_company_name || "—"} />
              <DetailRow label="Script ID" value={drawerEntry.script_id || "—"} mono />
              <DetailRow label="Drug NDC" value={drawerEntry.drug_ndc || "—"} mono />
              <DetailRow label="Brand Name" value={drawerEntry.drug_brand_name || "—"} />
              <DetailRow label="Generic Name" value={drawerEntry.drug_generic_name || "—"} />
              <DetailRow label="Fulfillment Date" value={drawerEntry.fulfillment_date ? new Date(drawerEntry.fulfillment_date).toLocaleDateString() : "—"} />
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <DetailRow label="ApalyRx Fee" value={`$${Number(drawerEntry.apalyrx_fee || drawerEntry.program_admin_fee).toFixed(2)}`} />
                <DetailRow label="Admin Fee" value={`$${Number(drawerEntry.program_admin_fee).toFixed(2)}`} />
                <DetailRow label="Value-Based Fee" value={`$${Number(drawerEntry.value_based_fee).toFixed(2)}`} />
                <DetailRow label="Total Commissionable" value={`$${Number(drawerEntry.total_commissionable).toFixed(2)}`} />
                <DetailRow label="Rate Applied" value={`${Number(drawerEntry.commission_rate_applied).toFixed(1)}%`} />
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-semibold text-[#102a4c]">Commission</span>
                  <span className="text-lg font-bold text-green-700">${Number(drawerEntry.commission_amount).toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <DetailRow label="Import Source" value={drawerEntry.import_source} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium text-[#102a4c] ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
