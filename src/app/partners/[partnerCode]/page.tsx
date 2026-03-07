"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { CheckCircle } from "lucide-react";

const LIVES_OPTIONS = [
  "Under 500",
  "500-2,500",
  "2,500-10,000",
  "10,000+",
];

export default function ReferralFormPage() {
  const params = useParams();
  const partnerCode = (params.partnerCode as string).toUpperCase();

  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    ein: "",
    contactName: "",
    contactEmail: "",
    phone: "",
    estimatedLives: "",
    message: "",
  });

  useEffect(() => {
    async function checkPartner() {
      const supabase = createPartnerClient();
      const { data } = await supabase
        .from("partner_organizations")
        .select("company_name, status")
        .eq("partner_code", partnerCode)
        .single();

      if (!data || data.status !== "active") {
        setInvalid(true);
      } else {
        setPartnerName(data.company_name);
      }
      setLoading(false);
    }
    checkPartner();
  }, [partnerCode]);

  function formatEin(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length > 2) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return digits;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/partners/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, partnerCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-[#102a4c] mb-2">
            Invalid Link
          </h2>
          <p className="text-sm text-gray-600">
            This referral link is not valid or the partner account is no longer
            active.
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#102a4c] mb-2">
            Thank You!
          </h2>
          <p className="text-sm text-gray-600">
            Your information has been received. You&apos;ll hear from the ApalyRx
            team soon.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <Image
            src="/apalyrx-logo-navy-orange.png"
            alt="ApalyRx"
            width={160}
            height={44}
            className="h-11 w-auto mx-auto mb-4"
          />
          <p className="text-sm text-gray-600">
            You&apos;ve been referred by{" "}
            <strong className="text-[#102a4c]">{partnerName}</strong>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[#102a4c] mb-4">
            Tell Us About Your Organization
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, companyName: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EIN *
              </label>
              <input
                type="text"
                required
                value={form.ein}
                onChange={(e) =>
                  setForm((p) => ({ ...p, ein: formatEin(e.target.value) }))
                }
                className={inputClass}
                placeholder="XX-XXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                required
                value={form.contactName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactName: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                required
                value={form.contactEmail}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactEmail: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Covered Lives
              </label>
              <select
                value={form.estimatedLives}
                onChange={(e) =>
                  setForm((p) => ({ ...p, estimatedLives: e.target.value }))
                }
                className={inputClass}
              >
                <option value="">Select...</option>
                {LIVES_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
