"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { CheckCircle, Eye, EyeOff, Loader2, Check } from "lucide-react";

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

type FieldErrors = Partial<Record<keyof FormData, string>>;

function formatEin(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length > 2) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return digits;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return digits;
}

function validateEin(value: string): string | null {
  if (!value) return "EIN is required.";
  if (!/^\d{2}-\d{7}$/.test(value)) return "Please enter a valid EIN (XX-XXXXXXX).";
  return null;
}

function validatePhone(value: string): string | null {
  if (!value) return "Phone is required.";
  if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) return "Please enter a valid phone number (XXX-XXX-XXXX).";
  return null;
}

function validateZip(value: string): string | null {
  if (!value) return "Zip code is required.";
  if (!/^\d{5}$/.test(value)) return "Please enter a valid 5-digit zip code.";
  return null;
}

export default function PartnerSignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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

  // Async uniqueness validation state
  const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [einStatus, setEinStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const emailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const einTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkEmailAvailability = useCallback(async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus("idle");
      return;
    }
    setEmailStatus("checking");
    try {
      const res = await fetch("/partners/api/validate/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setEmailStatus(data.available ? "available" : "taken");
      if (!data.available) {
        setFieldErrors((prev) => ({ ...prev, email: "__taken__" }));
      } else {
        setFieldErrors((prev) => ({ ...prev, email: undefined }));
      }
    } catch {
      setEmailStatus("idle");
    }
  }, []);

  const checkEinAvailability = useCallback(async (ein: string) => {
    if (!ein || !/^\d{2}-\d{7}$/.test(ein)) {
      setEinStatus("idle");
      return;
    }
    setEinStatus("checking");
    try {
      const res = await fetch("/partners/api/validate/ein", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ein }),
      });
      const data = await res.json();
      setEinStatus(data.available ? "available" : "taken");
      if (!data.available) {
        setFieldErrors((prev) => ({ ...prev, ein: "__taken__" }));
      } else {
        setFieldErrors((prev) => {
          const next = { ...prev };
          if (next.ein === "__taken__") next.ein = undefined;
          return next;
        });
      }
    } catch {
      setEinStatus("idle");
    }
  }, []);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "email" && !form.notificationEmail) {
      setForm((prev) => ({ ...prev, notificationEmail: value }));
    }

    // Debounced uniqueness checks
    if (field === "email") {
      setEmailStatus("idle");
      if (emailTimer.current) clearTimeout(emailTimer.current);
      emailTimer.current = setTimeout(() => checkEmailAvailability(value.trim()), 500);
    }
    if (field === "ein") {
      setEinStatus("idle");
      if (einTimer.current) clearTimeout(einTimer.current);
      einTimer.current = setTimeout(() => checkEinAvailability(value.trim()), 500);
    }
  }

  function setFieldError(field: keyof FormData, msg: string | null) {
    setFieldErrors((prev) => ({ ...prev, [field]: msg || undefined }));
  }

  function validateFieldOnBlur(field: keyof FormData) {
    const value = form[field].trim();
    switch (field) {
      case "email":
        if (!value) {
          setFieldError("email", "Email is required.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setFieldError("email", "Please enter a valid email address.");
        } else {
          checkEmailAvailability(value);
        }
        break;
      case "ein":
        setFieldError("ein", validateEin(value));
        if (!validateEin(value)) checkEinAvailability(value);
        break;
      case "phone":
        setFieldError("phone", validatePhone(value));
        break;
      case "zip":
        setFieldError("zip", validateZip(value));
        break;
      case "address":
        setFieldError("address", !value ? "Address is required." : null);
        break;
      case "city":
        setFieldError("city", !value ? "City is required." : null);
        break;
      case "state":
        setFieldError("state", !value ? "State is required." : null);
        break;
      case "companyName":
        setFieldError("companyName", !value ? "Company name is required." : null);
        break;
    }
  }

  function validateStep1() {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (emailStatus === "taken") {
      setError("This email is already registered.");
      return false;
    }
    if (emailStatus === "checking") {
      setError("Please wait while we verify your email.");
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

  function validateStep2(): boolean {
    const errors: FieldErrors = {};
    if (!form.companyName.trim()) errors.companyName = "Company name is required.";
    const einErr = validateEin(form.ein.trim());
    if (einErr) errors.ein = einErr;
    if (einStatus === "taken") errors.ein = "__taken__";
    if (!form.address.trim()) errors.address = "Address is required.";
    if (!form.city.trim()) errors.city = "City is required.";
    if (!form.state) errors.state = "State is required.";
    const zipErr = validateZip(form.zip.trim());
    if (zipErr) errors.zip = zipErr;
    const phoneErr = validatePhone(form.phone.trim());
    if (phoneErr) errors.phone = phoneErr;

    setFieldErrors(errors);
    if (einStatus === "checking") {
      setError("Please wait while we verify your EIN.");
      return false;
    }
    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      setError("Please fix the errors below.");
    }
    return !hasErrors;
  }

  function nextStep() {
    setError("");
    setFieldErrors({});
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
            Account Created
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
  const inputErrorClass =
    "w-full px-3 py-2.5 border border-red-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400";

  function fieldInputClass(field: keyof FormData) {
    return fieldErrors[field] ? inputErrorClass : inputClass;
  }

  function RequiredLabel({ text }: { text: string }) {
    return (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {text} <span className="text-[#ff5e00]">*</span>
      </label>
    );
  }

  function OptionalLabel({ text }: { text: string }) {
    return (
      <label className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
    );
  }

  function FieldError({ field }: { field: keyof FormData }) {
    if (!fieldErrors[field]) return null;
    return <p className="text-xs text-red-600 mt-1">{fieldErrors[field]}</p>;
  }

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
                    <RequiredLabel text="First Name" />
                    <input type="text" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <RequiredLabel text="Last Name" />
                    <input type="text" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <RequiredLabel text="Email" />
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => validateFieldOnBlur("email")}
                      className={emailStatus === "taken" || fieldErrors.email ? inputErrorClass + " pr-9" : inputClass + " pr-9"}
                    />
                    {emailStatus === "checking" && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                    )}
                    {emailStatus === "available" && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {emailStatus === "taken" && (
                    <p className="text-xs text-red-600 mt-1">
                      An account with this email already exists.{" "}
                      <Link href="/partners" className="text-[#ff5e00] hover:underline font-medium">Sign in instead?</Link>
                    </p>
                  )}
                  {fieldErrors.email && fieldErrors.email !== "__taken__" && (
                    <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <RequiredLabel text="Password" />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className={inputClass + " pr-10"}
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <RequiredLabel text="Confirm Password" />
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      className={inputClass + " pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
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
                  <RequiredLabel text="Company Name" />
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    onBlur={() => validateFieldOnBlur("companyName")}
                    className={fieldInputClass("companyName")}
                  />
                  <FieldError field="companyName" />
                </div>
                <div>
                  <RequiredLabel text="EIN" />
                  <div className="relative">
                    <input
                      type="text"
                      value={form.ein}
                      onChange={(e) => update("ein", formatEin(e.target.value))}
                      onBlur={() => validateFieldOnBlur("ein")}
                      className={(einStatus === "taken" || (fieldErrors.ein && fieldErrors.ein !== "__taken__") ? inputErrorClass : fieldInputClass("ein")) + " pr-9"}
                      placeholder="XX-XXXXXXX"
                    />
                    {einStatus === "checking" && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                    )}
                    {einStatus === "available" && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {einStatus === "taken" ? (
                    <p className="text-xs text-red-600 mt-1">
                      This EIN is already registered in the ApalyRx system. Contact partners@apalyrx.com for assistance.
                    </p>
                  ) : (
                    fieldErrors.ein && fieldErrors.ein !== "__taken__" && (
                      <p className="text-xs text-red-600 mt-1">{fieldErrors.ein}</p>
                    )
                  )}
                </div>
                <div>
                  <RequiredLabel text="Address" />
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    onBlur={() => validateFieldOnBlur("address")}
                    className={fieldInputClass("address")}
                  />
                  <FieldError field="address" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <RequiredLabel text="City" />
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      onBlur={() => validateFieldOnBlur("city")}
                      className={fieldInputClass("city")}
                    />
                    <FieldError field="city" />
                  </div>
                  <div>
                    <RequiredLabel text="State" />
                    <select
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      onBlur={() => validateFieldOnBlur("state")}
                      className={fieldInputClass("state")}
                    >
                      <option value="">--</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <FieldError field="state" />
                  </div>
                  <div>
                    <RequiredLabel text="Zip" />
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) => update("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                      onBlur={() => validateFieldOnBlur("zip")}
                      className={fieldInputClass("zip")}
                      placeholder="XXXXX"
                      inputMode="numeric"
                    />
                    <FieldError field="zip" />
                  </div>
                </div>
                <div>
                  <OptionalLabel text="Website" />
                  <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <RequiredLabel text="Phone" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", formatPhone(e.target.value))}
                    onBlur={() => validateFieldOnBlur("phone")}
                    className={fieldInputClass("phone")}
                    placeholder="XXX-XXX-XXXX"
                    inputMode="tel"
                  />
                  <FieldError field="phone" />
                </div>
                <div>
                  <OptionalLabel text="Notification Email" />
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
                  <div><span className="font-medium text-gray-500">EIN:</span></div>
                  <div>{form.ein}</div>
                  <div><span className="font-medium text-gray-500">Address:</span></div>
                  <div>{form.address}, {form.city}, {form.state} {form.zip}</div>
                  <div><span className="font-medium text-gray-500">Phone:</span></div>
                  <div>{form.phone}</div>
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
                onClick={() => { setStep((s) => s - 1); setError(""); setFieldErrors({}); }}
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
                disabled={
                  (step === 1 && (emailStatus === "checking" || emailStatus === "taken")) ||
                  (step === 2 && (einStatus === "checking" || einStatus === "taken"))
                }
                className="px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors text-sm disabled:opacity-50"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !confirmed}
                className="px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Create Account"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
