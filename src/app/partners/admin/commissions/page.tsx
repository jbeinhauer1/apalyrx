"use client";

import { useState } from "react";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface PreviewRow {
  ein: string;
  periodMonth: string;
  programAdminFee: number;
  valueBased: number;
  customerName?: string;
  partnerName?: string;
  rate?: number;
  commission?: number;
  error?: string;
}

export default function AdminCommissionsPage() {
  const [tab, setTab] = useState<"csv" | "webhook">("csv");
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; errors: number } | null>(null);

  async function parseFile(f: File) {
    const text = await f.text();
    const lines = text.trim().split("\n");
    const header = lines[0].toLowerCase();
    if (!header.includes("customer_ein")) {
      alert("Invalid CSV format. Expected columns: customer_ein, period_month, program_admin_fee, value_based_fee");
      return;
    }

    const supabase = createPartnerClient();

    // Get all customer leads for matching
    const { data: leads } = await supabase
      .from("leads")
      .select("id, prospect_ein, prospect_company_name, organization_id")
      .eq("status", "customer");

    const { data: orgs } = await supabase
      .from("partner_organizations")
      .select("id, company_name, commission_rate");

    const orgMap = Object.fromEntries((orgs || []).map(o => [o.id, o]));

    const rows: PreviewRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map(c => c.trim());
      if (cols.length < 4) continue;
      const [ein, period, adminFee, vbFee] = cols;
      const lead = leads?.find(l => l.prospect_ein === ein);
      if (!lead) {
        rows.push({ ein, periodMonth: period, programAdminFee: Number(adminFee), valueBased: Number(vbFee), error: "EIN not found" });
      } else {
        const org = orgMap[lead.organization_id];
        const rate = Number(org?.commission_rate || 0);
        const total = Number(adminFee) + Number(vbFee);
        rows.push({
          ein,
          periodMonth: period,
          programAdminFee: Number(adminFee),
          valueBased: Number(vbFee),
          customerName: lead.prospect_company_name,
          partnerName: org?.company_name,
          rate,
          commission: total * (rate / 100),
        });
      }
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
              <h3 className="font-bold text-[#102a4c]">Upload CSV</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Expected format: <code className="bg-gray-100 px-1 rounded">customer_ein,period_month,program_admin_fee,value_based_fee</code>
            </p>
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
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-gray-500">EIN</th>
                      <th className="text-left px-3 py-2 font-medium text-gray-500">Customer</th>
                      <th className="text-left px-3 py-2 font-medium text-gray-500">Partner</th>
                      <th className="text-left px-3 py-2 font-medium text-gray-500">Period</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-500">Admin Fee</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-500">VB Fee</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-500">Rate</th>
                      <th className="text-right px-3 py-2 font-medium text-gray-500">Commission</th>
                      <th className="text-left px-3 py-2 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {preview.map((row, i) => (
                      <tr key={i} className={row.error ? "bg-red-50" : ""}>
                        <td className="px-3 py-2 font-mono text-xs">{row.ein}</td>
                        <td className="px-3 py-2">{row.customerName || "-"}</td>
                        <td className="px-3 py-2">{row.partnerName || "-"}</td>
                        <td className="px-3 py-2">{row.periodMonth}</td>
                        <td className="px-3 py-2 text-right">${row.programAdminFee.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right">${row.valueBased.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right">{row.rate ? `${row.rate}%` : "-"}</td>
                        <td className="px-3 py-2 text-right font-medium">{row.commission ? `$${row.commission.toFixed(2)}` : "-"}</td>
                        <td className="px-3 py-2">
                          {row.error ? (
                            <span className="flex items-center gap-1 text-red-600 text-xs"><AlertCircle className="w-3 h-3" />{row.error}</span>
                          ) : (
                            <span className="text-green-600 text-xs"><CheckCircle className="w-3 h-3 inline" /> Ready</span>
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
  "customer_ein": "12-3456789",
  "period_month": "2026-03",
  "program_admin_fee": 1250.00,
  "value_based_fee": 750.00
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
