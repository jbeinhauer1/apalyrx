"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

const roles = [
  "PBM / Health Plan",
  "Self-Funded Employer",
  "Benefits Consultant / Broker",
  "Pharmaceutical Manufacturer",
  "Independent Pharmacy",
  "Attorney / Legal",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      organization: (form.elements.namedItem("organization") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-[#0F1C2E] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-navy mb-3">Thank you.</h3>
        <p className="font-body text-lg text-muted-foreground">
          We will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-heading text-sm font-medium text-navy mb-1.5">
          Name <span className="text-orange">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 h-11 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-300 font-body text-body"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-heading text-sm font-medium text-navy mb-1.5">
          Email <span className="text-orange">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 h-11 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-300 font-body text-body"
        />
      </div>

      {/* Organization */}
      <div>
        <label htmlFor="organization" className="block font-heading text-sm font-medium text-navy mb-1.5">
          Organization
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          className="w-full px-4 h-11 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-300 font-body text-body"
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block font-heading text-sm font-medium text-navy mb-1.5">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="w-full px-4 h-11 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-300 font-body text-body bg-white"
        >
          <option value="">Select your role</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-heading text-sm font-medium text-navy mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all duration-300 font-body text-body resize-vertical"
        />
      </div>

      {status === "error" && (
        <p className="font-body text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full h-12 bg-[#0F1C2E] hover:bg-[#0F1C2E]/90 disabled:opacity-60 text-white font-heading font-semibold rounded-lg transition-all duration-300 text-[16px]"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
