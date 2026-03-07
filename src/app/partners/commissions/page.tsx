"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Calculator } from "lucide-react";

interface CommissionEntry {
  id: string;
  period_month: string;
  program_admin_fee: number;
  value_based_fee: number;
  total_commissionable: number;
  commission_rate_applied: number;
  commission_amount: number;
  import_source: string;
  lead?: { prospect_company_name: string } | null;
}

export default function CommissionsPage() {
  const [entries, setEntries] = useState<CommissionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setIsAdmin] = useState(false);

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

      let query = supabase
        .from("commission_entries")
        .select("*, lead:leads(prospect_company_name)")
        .order("period_month", { ascending: false });

      if (!pu.is_apaly_team && pu.organization_id) {
        query = query.eq("organization_id", pu.organization_id);
      }

      const { data } = await query;
      setEntries(data || []);
      setLoading(false);
    }
    load();
  }, []);

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
        <Link
          href="/partners/commissions/calculator"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Calculator className="w-4 h-4" />
          Projection Calculator
        </Link>
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
                <th className="text-right px-4 py-3 font-medium text-gray-500">Admin Fee</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Value-Based</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Total</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Rate</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Commission</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Source</th>
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
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{e.period_month}</td>
                    <td className="px-4 py-3">{e.lead?.prospect_company_name || "-"}</td>
                    <td className="px-4 py-3 text-right">${Number(e.program_admin_fee).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">${Number(e.value_based_fee).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">${Number(e.total_commissionable).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{Number(e.commission_rate_applied).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">${Number(e.commission_amount).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded">{e.import_source}</span>
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
