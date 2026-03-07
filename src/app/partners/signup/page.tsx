"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY",
  "LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND",
  "OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  phone: string;
  notificationEmail: string;
}

export default function PartnerSignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    ein: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    phone: "",
    notificationEmail: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "email" && !form.notificationEmail) {
      setForm((prev) => ({ ...prev, notificationEmail: value }));
    }
  }

  function formatEin(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length > 2) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return digits;
  }

  function validateStep1() {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  }

  function validateStep2() {
    if (!form.companyName) {
      setError("Company name is required.");
      return false;
    }
    return true;
  }

  function nextStep() {
    setError("");
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    if (!confirmed) {
      setError("Please confirm all information is accurate.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/partners/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#102a4c] mb-2">
            Application Submitted
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Check your email to verify your account. Once verified and approved
            by ApalyRx, you can log in to your partner dashboard.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s <= step
                    ? "bg-[#ff5e00] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${
                    s < step ? "bg-[#ff5e00]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <h2 className="text-lg font-bold text-[#102a4c] mb-4">
                Your Info
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input type="text" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input type="text" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Password *</label>
                  <input type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} className={inputClass} placeholder="At least 8 characters" />
                </div>
                <div>
                  <label className={labelClass}>Confirm Password *</label>
                  <input type="password" required value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className={inputClass} />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-bold text-[#102a4c] mb-4">
                Your Organization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Company Name *</label>
                  <input type="text" required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>EIN</label>
                  <input type="text" value={form.ein} onChange={(e) => update("ein", formatEin(e.target.value))} className={inputClass} placeholder="XX-XXXXXXX" />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <select value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass}>
                      <option value="">--</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Zip</label>
                    <input type="text" value={form.zip} onChange={(e) => update("zip", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Website</label>
                  <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Notification Email</label>
                  <input type="email" value={form.notificationEmail} onChange={(e) => update("notificationEmail", e.target.value)} className={inputClass} />
                  <p className="text-xs text-gray-500 mt-1">
                    Lead alerts will be sent here. Defaults to your signup email.
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-bold text-[#102a4c] mb-4">
                Review & Submit
              </h2>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-gray-50 rounded-lg p-4">
                  <div><span className="font-medium text-gray-500">Name:</span></div>
                  <div>{form.firstName} {form.lastName}</div>
                  <div><span className="font-medium text-gray-500">Email:</span></div>
                  <div>{form.email}</div>
                  <div><span className="font-medium text-gray-500">Company:</span></div>
                  <div>{form.companyName}</div>
                  {form.ein && (
                    <>
                      <div><span className="font-medium text-gray-500">EIN:</span></div>
                      <div>{form.ein}</div>
                    </>
                  )}
                  {form.address && (
                    <>
                      <div><span className="font-medium text-gray-500">Address:</span></div>
                      <div>{form.address}, {form.city}, {form.state} {form.zip}</div>
                    </>
                  )}
                  {form.website && (
                    <>
                      <div><span className="font-medium text-gray-500">Website:</span></div>
                      <div>{form.website}</div>
                    </>
                  )}
                  <div><span className="font-medium text-gray-500">Notification:</span></div>
                  <div>{form.notificationEmail || form.email}</div>
                </div>

                <label className="flex items-start gap-2 mt-4">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5 accent-[#ff5e00]"
                  />
                  <span className="text-gray-600">
                    I confirm all information is accurate.
                  </span>
                </label>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button
                onClick={() => { setStep((s) => s - 1); setError(""); }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors text-sm"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !confirmed}
                className="px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
