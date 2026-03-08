"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface DrugRow {
  id: string;
  name: string;
  scriptsPerMemberMonth: number;
  feePerScript: number;
  diseaseName: string;
  prevalence: number;
  drugsInDisease: number;
  enabled: boolean;
}

interface DiseaseGroup {
  disease: { name: string; prevalence_per_1000: number };
  drugs: { id: string; name: string; scriptsPerMemberMonth: number; feePerScript: number }[];
}

export default function CalculatorPage() {
  const [drugRows, setDrugRows] = useState<DrugRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [coveredLives, setCoveredLives] = useState("");
  const [commissionRate, setCommissionRate] = useState("10");
  const [projectionYears, setProjectionYears] = useState(12);

  const loadData = useCallback(async () => {
    const res = await fetch("/api/calculator");
    const data = await res.json();
    const rows: DrugRow[] = [];
    for (const group of Object.values(data.diseaseGroups) as DiseaseGroup[]) {
      for (const drug of group.drugs) {
        rows.push({
          ...drug,
          diseaseName: group.disease.name,
          prevalence: group.disease.prevalence_per_1000,
          drugsInDisease: group.drugs.length,
          enabled: true,
        });
      }
    }
    setDrugRows(rows);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const lives = parseFloat(coveredLives) || 0;
  const rate = (parseFloat(commissionRate) || 0) / 100;

  function calcDrug(drug: DrugRow) {
    if (!drug.enabled || lives <= 0) return { members: 0, scripts: 0, monthlyComm: 0, annualComm: 0 };
    const members = (lives / 1000) * drug.prevalence / drug.drugsInDisease;
    const scripts = members * drug.scriptsPerMemberMonth;
    const monthlyComm = scripts * drug.feePerScript * rate;
    const annualComm = monthlyComm * 12;
    return { members, scripts, monthlyComm, annualComm };
  }

  const totals = drugRows.reduce(
    (acc, d) => {
      const c = calcDrug(d);
      return {
        scripts: acc.scripts + c.scripts,
        monthlyComm: acc.monthlyComm + c.monthlyComm,
        annualComm: acc.annualComm + c.annualComm,
      };
    },
    { scripts: 0, monthlyComm: 0, annualComm: 0 }
  );

  const projectedComm = totals.monthlyComm * projectionYears;

  // Group drugs by disease for display
  const diseaseNames = Array.from(new Set(drugRows.map(d => d.diseaseName))).sort();

  function toggleDrug(id: string) {
    setDrugRows(prev => prev.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#102a4c] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/apalyrx-logo-white-orange.png" alt="ApalyRx" width={120} height={33} className="h-8 w-auto" />
          </Link>
          <Link href="/partners/signup" className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90">
            Become a Partner
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#102a4c] mb-2">Estimate Your Partner Commission</h1>
          <p className="text-gray-600">See your projected earnings based on your client&apos;s covered population</p>
        </div>

        {/* Inputs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Covered Lives</label>
              <input
                type="number"
                min="1"
                value={coveredLives}
                onChange={(e) => setCoveredLives(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Commission Rate %</label>
              <input
                type="number"
                min="1"
                max="30"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]"
              />
              <p className="text-xs text-gray-500 mt-1">Your commission rate is set by ApalyRx. Use the rate in your partner agreement, or enter 10% as an estimate.</p>
            </div>
          </div>
        </div>

        {/* Drug table */}
        {drugRows.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 w-10"></th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Drug</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Condition</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500">Est. Scripts/Mo</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500">Est. Commission/Mo</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500">Est. Annual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {diseaseNames.map(disease => {
                    const diseaseDrugs = drugRows.filter(d => d.diseaseName === disease);
                    const prevalence = diseaseDrugs[0]?.prevalence || 0;
                    return [
                      <tr key={`header-${disease}`} className="bg-gray-50/50">
                        <td colSpan={6} className="px-4 py-2">
                          <span className="font-medium text-[#102a4c]">{disease}</span>
                          <span className="text-xs text-gray-500 ml-2">({prevalence.toFixed(2)} per 1,000)</span>
                        </td>
                      </tr>,
                      ...diseaseDrugs.map(drug => {
                        const c = calcDrug(drug);
                        return (
                          <tr key={drug.id} className={drug.enabled ? "hover:bg-gray-50" : "opacity-50"}>
                            <td className="px-4 py-3">
                              <input type="checkbox" checked={drug.enabled} onChange={() => toggleDrug(drug.id)}
                                className="w-4 h-4 text-[#ff5e00] rounded focus:ring-[#ff5e00]" />
                            </td>
                            <td className="px-4 py-3 font-medium text-[#102a4c]">{drug.name}</td>
                            <td className="px-4 py-3 text-gray-500">{drug.diseaseName}</td>
                            <td className="px-4 py-3 text-right">{lives > 0 ? c.scripts.toFixed(1) : "-"}</td>
                            <td className="px-4 py-3 text-right">{lives > 0 ? `$${c.monthlyComm.toFixed(2)}` : "-"}</td>
                            <td className="px-4 py-3 text-right font-medium">{lives > 0 ? `$${c.annualComm.toFixed(2)}` : "-"}</td>
                          </tr>
                        );
                      }),
                    ];
                  })}
                </tbody>
                {lives > 0 && (
                  <tfoot className="bg-[#102a4c] text-white">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 font-bold">Total Estimated Commission</td>
                      <td className="px-4 py-3 text-right font-medium">{totals.scripts.toFixed(1)}</td>
                      <td className="px-4 py-3 text-right font-bold">${totals.monthlyComm.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-bold">${totals.annualComm.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}

        {drugRows.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 mb-6">
            No drugs available in the formulary yet.
          </div>
        )}

        {/* Projection toggle */}
        {lives > 0 && totals.monthlyComm > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-[#102a4c] mb-4">Projected Commission</h3>
            <div className="flex gap-2 mb-4">
              {[12, 24, 36].map(months => (
                <button
                  key={months}
                  onClick={() => setProjectionYears(months)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    projectionYears === months
                      ? "bg-[#ff5e00] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {months} months
                </button>
              ))}
            </div>
            <div className="text-3xl font-bold text-[#102a4c]">
              ${projectedComm.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Projected over {projectionYears} months at ${totals.monthlyComm.toFixed(2)}/month
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs text-gray-500 leading-relaxed mb-8">
          Estimates are for illustrative purposes only. Drug utilization is distributed evenly across drugs within each condition.
          Actual utilization will vary. Commission is based on ApalyRx Program Administrative Fees per your partner agreement and
          does not include drug acquisition cost or other pass-through charges. Assumes 100% biosimilar conversion on program
          effective date.
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/partners/signup" className="px-6 py-3 bg-[#ff5e00] text-white rounded-lg font-semibold hover:bg-[#ff5e00]/90 transition-colors">
            Become a Partner
          </Link>
          <Link href="/partners" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
}
