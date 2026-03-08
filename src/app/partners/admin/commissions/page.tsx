"use client";

import { useState } from "react";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface PreviewRow {
  partnerCode: string;
  customerEin: string;
  customerName: string;
  periodMonth: string;
  scriptId: string;
  drugNdc: string;
  drugBrandName: string;
  drugGenericName: string;
  fulfillmentDate: string;
  apalyrxFee: number;
  commissionRate: number;
  commissionAmount: number;
  // resolved
  partnerName?: string;
  orgId?: string;
  leadId?: string;
  error?: string;
}

const CSV_COLUMNS = "partner_code,customer_ein,customer_name,period_month,script_id,drug_ndc,drug_brand_name,drug_generic_name,fulfillment_date,apalyrx_fee,commission_rate,commission_amount";

export default function AdminCommissionsPage() {
  const [tab, setTab] = useState<"csv" | "webhook">("csv");
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; errors: number } | null>(null);

  async function parseFile(f: File) {
    const text = await f.text();
    const lines = text.trim().split("\n");
    const header = lines[0].toLowerCase().replace(/\r/g, "");
    if (!header.includes("partner_code")) {
      alert("Invalid CSV format. Expected columns: " + CSV_COLUMNS);
      return;
    }

    const cols = header.split(",").map(c => c.trim());
    const idx = (name: string) => cols.indexOf(name);

    const supabase = createPartnerClient();

    // Get orgs by partner_code for matching
    const { data: orgs } = await supabase
      .from("partner_organizations")
      .select("id, partner_code, company_name, commission_rate");

    const orgByCode = Object.fromEntries((orgs || []).map(o => [o.partner_code, o]));

    // Get customer leads for EIN matching
    const { data: leads } = await supabase
      .from("leads")
      .select("id, prospect_ein, organization_id")
      .eq("status", "customer");

    const rows: PreviewRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].replace(/\r/g, "").split(",").map(c => c.trim().replace(/^"|"$/g, ""));
      if (vals.length < 4) continue;

      const get = (name: string) => vals[idx(name)] || "";

      const partnerCode = get("partner_code");
      const customerEin = get("customer_ein");
      const customerName = get("customer_name");
      const periodMonth = get("period_month");
      const scriptId = get("script_id");
      const drugNdc = get("drug_ndc");
      const drugBrandName = get("drug_brand_name");
      const drugGenericName = get("drug_generic_name");
      const fulfillmentDate = get("fulfillment_date");
      const apalyrxFee = Number(get("apalyrx_fee")) || 0;
      const commissionRate = Number(get("commission_rate")) || 0;
      const commissionAmount = Number(get("commission_amount")) || 0;

      const org = orgByCode[partnerCode];
      if (!org) {
        rows.push({ partnerCode, customerEin, customerName, periodMonth, scriptId, drugNdc, drugBrandName, drugGenericName, fulfillmentDate, apalyrxFee, commissionRate, commissionAmount, error: `Partner code "${partnerCode}" not found` });
        continue;
      }

      // Try to match lead by EIN + org
      const lead = leads?.find(l => l.prospect_ein === customerEin && l.organization_id === org.id);

      rows.push({
        partnerCode, customerEin, customerName, periodMonth, scriptId, drugNdc, drugBrandName, drugGenericName, fulfillmentDate, apalyrxFee, commissionRate, commissionAmount,
        partnerName: org.company_name,
        orgId: org.id,
        leadId: lead?.id,
      });
    }
    setPreview(rows);
    setResult(null);
  }

  async function confirmImport() {
    setImporting(true);
    const res = await fetch("/partners/api/admin/commissions/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: preview.filter(r => !r.error) }),
    });
    const data = await res.json();
    setResult({ success: data.successCount || 0, errors: data.errorCount || 0 });
    setImporting(false);
    setPreview([]);
    setFile(null);
  }

  const webhookUrl = "https://www.apalyrx.com/partners/api/webhooks/commission-data";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#102a4c]">Commission Import</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button onClick={() => setTab("csv")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "csv" ? "bg-white shadow-sm text-[#102a4c]" : "text-gray-500"}`}>
          CSV Import
        </button>
        <button onClick={() => setTab("webhook")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "webhook" ? "bg-white shadow-sm text-[#102a4c]" : "text-gray-500"}`}>
          Webhook Config
        </button>
      </div>

      {tab === "csv" && (
        <div className="space-y-4">
          {result && (
            <div className={`rounded-lg p-4 text-sm ${result.errors ? "bg-orange-50 border border-orange-200 text-orange-800" : "bg-green-50 border border-green-200 text-green-800"}`}>
              <CheckCircle className="w-4 h-4 inline mr-1" />
              {result.success} rows imported successfully. {result.errors} errors.
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="w-5 h-5 text-[#ff5e00]" />
              <h3 className="font-bold text-[#102a4c]">Upload Script-Level CSV</h3>
            </div>
            <p className="text-xs text-gray-500 mb-2">Expected columns:</p>
            <code className="block bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-200 mb-4 overflow-x-auto">
              {CSV_COLUMNS}
            </code>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { setFile(f); parseFile(f); }
              }}
              className="text-sm"
            />
          </div>

          {preview.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-medium text-[#102a4c]">
                  {preview.length} rows ({preview.filter(r => r.error).length} errors)
                </span>
                <button
                  onClick={confirmImport}
                  disabled={importing || preview.every(r => r.error)}
                  className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90 disabled:opacity-50"
                >
                  {importing ? "Importing..." : "Confirm Import"}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">Partner</th>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">EIN</th>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">Customer</th>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">Period</th>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">Script</th>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">Drug</th>
                      <th className="text-right px-2 py-2 font-medium text-gray-500">Fee</th>
                      <th className="text-right px-2 py-2 font-medium text-gray-500">Rate</th>
                      <th className="text-right px-2 py-2 font-medium text-gray-500">Commission</th>
                      <th className="text-left px-2 py-2 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {preview.map((row, i) => (
                      <tr key={i} className={row.error ? "bg-red-50" : ""}>
                        <td className="px-2 py-2">{row.partnerName || row.partnerCode}</td>
                        <td className="px-2 py-2 font-mono">{row.customerEin}</td>
                        <td className="px-2 py-2">{row.customerName || "-"}</td>
                        <td className="px-2 py-2">{row.periodMonth}</td>
                        <td className="px-2 py-2 font-mono">{row.scriptId || "-"}</td>
                        <td className="px-2 py-2">{row.drugBrandName || row.drugGenericName || "-"}</td>
                        <td className="px-2 py-2 text-right">${row.apalyrxFee.toFixed(2)}</td>
                        <td className="px-2 py-2 text-right">{row.commissionRate}%</td>
                        <td className="px-2 py-2 text-right font-medium">${row.commissionAmount.toFixed(2)}</td>
                        <td className="px-2 py-2">
                          {row.error ? (
                            <span className="flex items-center gap-1 text-red-600"><AlertCircle className="w-3 h-3" />{row.error}</span>
                          ) : (
                            <span className="text-green-600"><CheckCircle className="w-3 h-3 inline" /> Ready</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "webhook" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#ff5e00]" />
            <h3 className="font-bold text-[#102a4c]">Webhook Endpoint</h3>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Endpoint URL</label>
            <code className="block bg-gray-50 px-3 py-2 rounded-lg text-sm border border-gray-200">
              POST {webhookUrl}
            </code>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Expected JSON Schema</label>
            <pre className="bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-200 overflow-x-auto">
{`{
  "partner_code": "acme-health",
  "customer_ein": "12-3456789",
  "customer_name": "Example Corp",
  "period_month": "2026-03",
  "script_id": "RX-12345",
  "drug_ndc": "12345-678-90",
  "drug_brand_name": "BrandName",
  "drug_generic_name": "generic_name",
  "fulfillment_date": "2026-03-15",
  "apalyrx_fee": 125.00,
  "commission_rate": 10.0,
  "commission_amount": 12.50
}`}
            </pre>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Authentication</label>
            <p className="text-sm text-gray-600">
              Include header: <code className="bg-gray-100 px-1 rounded">x-apaly-signature: HMAC-SHA256(body, secret)</code>
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            No webhook calls received yet
          </div>
        </div>
      )}
    </div>
  );
}
