"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye, Pencil } from "lucide-react";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import Link from "next/link";
import { calculateApalyFee } from "@/lib/partners/utils/feeCalculator";

interface Drug {
  id: string;
  brandName: string;
  genericName: string;
  isBiosimilar: boolean;
  wacPrice: number;
  avgPbmPostRebate: number;
  apalyrxNetPrice: number;
  scriptsPerMemberMonth: number;
  diseaseIds: string[];
  enabled: boolean;
  customPbmPrice: number | null;
}

interface Disease {
  id: string;
  name: string;
  prevalence: number;
}

interface Tier {
  net_cost_min: number;
  net_cost_max: number | null;
  flat_fee: number;
  percent_fee: number;
  vbp_cap: number | null;
}

export default function ProspectReportPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [prospectName, setProspectName] = useState("");
  const [coveredLives, setCoveredLives] = useState("");
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [reportDate, setReportDate] = useState(new Date().toISOString().split("T")[0]);
  const [includePricingDetail, setIncludePricingDetail] = useState(true);
  const [includeProjections, setIncludeProjections] = useState(true);
  const [editingPbm, setEditingPbm] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const loadData = useCallback(async () => {
    // Gate behind active partner status
    const supabase = createPartnerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: pu } = await supabase
        .from("partner_users")
        .select("organization_id, is_apaly_team")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (pu && !pu.is_apaly_team && pu.organization_id) {
        const { data: org } = await supabase
          .from("partner_organizations")
          .select("status")
          .eq("id", pu.organization_id)
          .maybeSingle();
        if (org?.status !== "active") {
          router.replace("/partners/dashboard?msg=reports_requires_active");
          return;
        }
      }
    }

    const res = await fetch(`/partners/api/reports/prospect?leadId=${leadId}`);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to load report data");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setProspectName(data.lead.prospectCompanyName);
    setCoveredLives(data.lead.estimatedLives || "");
    setDrugs(data.drugs.map((d: Omit<Drug, "enabled" | "customPbmPrice">) => ({ ...d, enabled: true, customPbmPrice: null })));
    setDiseases(data.diseases);
    setTiers(data.tiers);
    setLoading(false);
  }, [leadId, router]);

  useEffect(() => { loadData(); }, [loadData]);

  const lives = parseFloat(coveredLives) || 0;

  function getDrugCalcs(drug: Drug) {
    if (!drug.enabled || lives <= 0) return { members: 0, scriptsYr: 0, apalyFee: 0, totalApalyCost: 0, savingsPerScript: 0, annualSavings: 0 };

    const diseaseDrugs = drugs.filter(d => d.enabled && d.diseaseIds.some(did => drug.diseaseIds.includes(did)));
    const disease = diseases.find(d => drug.diseaseIds.includes(d.id));
    if (!disease) return { members: 0, scriptsYr: 0, apalyFee: 0, totalApalyCost: 0, savingsPerScript: 0, annualSavings: 0 };

    const drugsInDisease = diseaseDrugs.filter(d => d.diseaseIds.includes(disease.id)).length;
    const members = (lives / 1000) * disease.prevalence / Math.max(drugsInDisease, 1);
    const scriptsYr = members * drug.scriptsPerMemberMonth * 12;
    const apalyFee = calculateApalyFee(drug.apalyrxNetPrice, tiers);
    const totalApalyCost = drug.apalyrxNetPrice + apalyFee;
    const pbmPrice = drug.customPbmPrice ?? drug.avgPbmPostRebate;
    const savingsPerScript = pbmPrice - totalApalyCost;
    const annualSavings = savingsPerScript * scriptsYr;

    return { members, scriptsYr, apalyFee, totalApalyCost, savingsPerScript, annualSavings };
  }

  const enabledDrugs = drugs.filter(d => d.enabled);
  const totalAnnualSavings = enabledDrugs.reduce((sum, d) => sum + getDrugCalcs(d).annualSavings, 0);

  function toggleDrug(id: string) {
    setDrugs(prev => prev.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  }

  function setPbmPrice(id: string, val: string) {
    setDrugs(prev => prev.map(d => d.id === id ? { ...d, customPbmPrice: val ? parseFloat(val) : null } : d));
  }

  async function generatePdf() {
    setGenerating(true);

    // Log to audit
    await fetch("/partners/api/reports/prospect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, coveredLives: lives }),
    });

    // Dynamic import to avoid SSR issues
    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });

    // Cover section
    doc.setFillColor(16, 42, 76);
    doc.rect(0, 0, 612, 120, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("ApalyRx", 40, 50);
    doc.setFontSize(10);
    doc.setTextColor(255, 94, 0);
    doc.text("Prescription Drug Cost Analysis", 40, 70);
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(9);
    doc.text(`Prepared for: ${prospectName}`, 40, 90);
    doc.text(`Prepared by: ApalyRx Partner Program  |  ${reportDate}`, 40, 105);

    let y = 150;

    // Executive Summary
    doc.setTextColor(16, 42, 76);
    doc.setFontSize(14);
    doc.text("Executive Summary", 40, y);
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(`Covered lives analyzed: ${lives.toLocaleString()}`, 40, y); y += 15;
    doc.text(`Total drugs included: ${enabledDrugs.length}`, 40, y); y += 15;
    doc.text(`Estimated annual savings: $${totalAnnualSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 40, y); y += 15;
    if (includeProjections) {
      doc.text(`3-year projected savings: $${(totalAnnualSavings * 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 40, y); y += 15;
      doc.text(`5-year projected savings: $${(totalAnnualSavings * 5).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 40, y); y += 15;
    }
    y += 15;

    // Drug detail table
    if (includePricingDetail) {
      doc.setTextColor(16, 42, 76);
      doc.setFontSize(14);
      doc.text("Drug Detail", 40, y);
      y += 10;

      const tableData = enabledDrugs.map(drug => {
        const c = getDrugCalcs(drug);
        const pbmPrice = drug.customPbmPrice ?? drug.avgPbmPostRebate;
        const disease = diseases.find(d => drug.diseaseIds.includes(d.id));
        return [
          drug.isBiosimilar ? `${drug.brandName} (${drug.genericName})` : drug.brandName,
          disease?.name || "-",
          c.members.toFixed(0),
          c.scriptsYr.toFixed(0),
          `$${drug.wacPrice.toFixed(2)}`,
          `$${pbmPrice.toFixed(2)}`,
          `$${c.totalApalyCost.toFixed(2)}`,
          `$${c.annualSavings.toFixed(2)}`,
          includeProjections ? `$${(c.annualSavings * 3).toFixed(2)}` : "",
        ].filter((_, i) => includeProjections || i !== 8);
      });

      const headers = ["Drug", "Condition", "Members", "Scripts/Yr", "WAC", "PBM Post-Rebate", "ApalyRx Cost", "Annual Savings"];
      if (includeProjections) headers.push("3-Yr Savings");

      autoTable(doc, {
        startY: y,
        head: [headers],
        body: tableData,
        styles: { fontSize: 7, cellPadding: 3 },
        headStyles: { fillColor: [16, 42, 76], textColor: [255, 255, 255] },
        margin: { left: 40, right: 40 },
        theme: "grid",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      y = (doc as any).lastAutoTable.finalY + 20;
    }

    // Savings summary
    doc.setTextColor(16, 42, 76);
    doc.setFontSize(14);
    if (y > 680) { doc.addPage(); y = 40; }
    doc.text("Savings Summary", 40, y);
    y += 20;
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);
    doc.text(`Annual Savings: $${totalAnnualSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 40, y); y += 18;
    if (includeProjections) {
      doc.text(`3-Year Savings: $${(totalAnnualSavings * 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 40, y); y += 18;
      doc.text(`5-Year Savings: $${(totalAnnualSavings * 5).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 40, y); y += 18;
    }

    // Disclaimer
    y += 10;
    if (y > 680) { doc.addPage(); y = 40; }
    doc.setFontSize(7);
    doc.setTextColor(107, 114, 128);
    const disclaimer = `This analysis is prepared by an authorized ApalyRx channel partner for informational purposes only. Estimates are based on average population utilization data and may differ from actual plan experience. Drug pricing reflects ApalyRx program pricing as of ${reportDate} and is subject to change. Assumes 100% biosimilar substitution on program effective date where applicable. This report is confidential and intended solely for the named recipient.`;
    const lines = doc.splitTextToSize(disclaimer, 532);
    doc.text(lines, 40, y);

    doc.save(`ApalyRx-Cost-Analysis-${prospectName.replace(/\s+/g, "-")}.pdf`);
    setGenerating(false);
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">{error}</div>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link href="/partners/reports" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#ff5e00]">
        <ArrowLeft className="w-4 h-4" /> Back to Reports
      </Link>

      <h1 className="text-2xl font-bold text-[#102a4c]">
        Generate Prospect Savings Report — {prospectName}
      </h1>

      {/* Covered Lives */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-[#102a4c] mb-3">Covered Lives</h3>
        <input
          type="number"
          value={coveredLives}
          onChange={(e) => setCoveredLives(e.target.value)}
          placeholder="Enter number of covered lives"
          className={`${inputClass} max-w-xs`}
        />
      </div>

      {/* Drug Selection & Pricing */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-bold text-[#102a4c]">Drug Selection & Pricing</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-500 w-10"></th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Drug</th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Condition</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">WAC/Retail</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">PBM Post-Rebate</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">ApalyRx Price</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">ApalyRx Fee</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">Savings/Script</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drugs.map(drug => {
                const c = getDrugCalcs(drug);
                const pbmPrice = drug.customPbmPrice ?? drug.avgPbmPostRebate;
                const disease = diseases.find(d => drug.diseaseIds.includes(d.id));
                return (
                  <tr key={drug.id} className={drug.enabled ? "hover:bg-gray-50" : "opacity-40"}>
                    <td className="px-3 py-2">
                      <input type="checkbox" checked={drug.enabled} onChange={() => toggleDrug(drug.id)}
                        className="w-4 h-4 text-[#ff5e00] rounded" />
                    </td>
                    <td className="px-3 py-2 font-medium text-[#102a4c]">
                      {drug.isBiosimilar ? `${drug.brandName} (${drug.genericName})` : drug.brandName}
                    </td>
                    <td className="px-3 py-2 text-gray-500">{disease?.name || "-"}</td>
                    <td className="px-3 py-2 text-right text-gray-500">${drug.wacPrice.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">
                      {editingPbm === drug.id ? (
                        <input
                          type="number"
                          step="0.01"
                          autoFocus
                          defaultValue={pbmPrice}
                          onBlur={(e) => { setPbmPrice(drug.id, e.target.value); setEditingPbm(null); }}
                          onKeyDown={(e) => { if (e.key === "Enter") { setPbmPrice(drug.id, (e.target as HTMLInputElement).value); setEditingPbm(null); } }}
                          className="w-24 px-2 py-1 border rounded text-sm text-right"
                        />
                      ) : (
                        <span className="inline-flex items-center gap-1 cursor-pointer" onClick={() => setEditingPbm(drug.id)}>
                          ${pbmPrice.toFixed(2)}
                          <Pencil className="w-3 h-3 text-gray-400" />
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">${drug.apalyrxNetPrice.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">${c.apalyFee.toFixed(2)}</td>
                    <td className={`px-3 py-2 text-right font-medium ${c.savingsPerScript >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${c.savingsPerScript.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="font-bold text-[#102a4c]">Report Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Prospect Company Name on Report</label>
            <input value={prospectName} onChange={(e) => setProspectName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Report Date</label>
            <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includePricingDetail} onChange={() => setIncludePricingDetail(!includePricingDetail)}
              className="w-4 h-4 text-[#ff5e00] rounded" />
            Include drug pricing detail
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includeProjections} onChange={() => setIncludeProjections(!includeProjections)}
              className="w-4 h-4 text-[#ff5e00] rounded" />
            Include 3-year and 5-year projections
          </label>
        </div>
      </div>

      {/* Summary */}
      {lives > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#102a4c] mb-3">Estimated Savings Preview</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${totalAnnualSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-gray-500 mt-1">Annual</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${(totalAnnualSavings * 3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-gray-500 mt-1">3-Year</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${(totalAnnualSavings * 5).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-gray-500 mt-1">5-Year</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={generatePdf}
          disabled={generating || lives <= 0}
          className="flex items-center gap-2 px-6 py-3 bg-[#ff5e00] text-white rounded-lg font-medium hover:bg-[#ff5e00]/90 disabled:opacity-50"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF
            </>
          )}
        </button>
        <button
          onClick={generatePdf}
          disabled={generating || lives <= 0}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          <Eye className="w-4 h-4" />
          Preview Report
        </button>
      </div>
    </div>
  );
}
