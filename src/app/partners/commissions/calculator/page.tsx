"use client";

import { useEffect, useState } from "react";
import { createPartnerClient } from "@/lib/partners/supabase/client";

export default function CalculatorPage() {
  const [employees, setEmployees] = useState(1000);
  const [specialtyPct, setSpecialtyPct] = useState(15);
  const [avgFee, setAvgFee] = useState(12);
  const [commissionRate, setCommissionRate] = useState<number | null>(null);
  const [durationMonths, setDurationMonths] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const { data: pu } = await supabase
        .from("partner_users")
        .select("organization_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (pu?.organization_id) {
        const { data: org } = await supabase
          .from("partner_organizations")
          .select("commission_rate, commission_duration_months")
          .eq("id", pu.organization_id)
          .maybeSingle();

        if (org?.commission_rate) setCommissionRate(Number(org.commission_rate));
        if (org?.commission_duration_months) setDurationMonths(org.commission_duration_months);
      }

      // Get default fee from settings
      const { data: settings } = await supabase
        .from("portal_settings")
        .select("key, value")
        .in("key", ["avg_commissionable_fee_per_life", "default_commission_duration_months"]);

      settings?.forEach((s) => {
        if (s.key === "avg_commissionable_fee_per_life") setAvgFee(Number(s.value));
      });

      setLoading(false);
    }
    load();
  }, []);

  const rate = commissionRate || 10; // placeholder
  const eligibleLives = Math.round(employees * (specialtyPct / 100));
  const monthlyFees = eligibleLives * avgFee;
  const monthlyCommission = monthlyFees * (rate / 100);
  const totalCommission = monthlyCommission * durationMonths;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#102a4c]">
        Commission Projection Calculator
      </h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Employees on Plan
          </label>
          <input
            type="number"
            min={0}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            % on Specialty / High-Cost Drugs: {specialtyPct}%
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={specialtyPct}
            onChange={(e) => setSpecialtyPct(Number(e.target.value))}
            className="w-full accent-[#ff5e00]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1%</span>
            <span>50%</span>
          </div>
        </div>

        {!commissionRate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
            Using a placeholder rate ({rate}%). Your commission rate will be set
            by ApalyRx upon activation.
          </div>
        )}

        {/* Results */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Est. Monthly Commissionable Fees</span>
            <span className="text-lg font-bold text-[#102a4c]">
              ${monthlyFees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Monthly Commission ({rate}%)</span>
            <span className="text-lg font-bold text-[#ff5e00]">
              ${monthlyCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#102a4c] text-white rounded-lg p-4">
            <span className="text-sm">Total Over {durationMonths} Months</span>
            <span className="text-2xl font-bold">
              ${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">
          This is an estimate only. Actual commissions are based on fees billed
          and collected by ApalyRx.
        </p>
      </div>
    </div>
  );
}
