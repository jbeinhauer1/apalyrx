"use client";

import { useState, FormEvent } from "react";

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
        <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-navy mb-3">Thank you.</h3>
        <p className="font-sans text-lg text-text-secondary">
          We will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-sans text-sm text-text-primary mb-1.5">
          Name <span className="text-orange">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 h-11 border border-border focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none transition-all duration-200 font-sans text-text-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-sans text-sm text-text-primary mb-1.5">
          Email <span className="text-orange">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 h-11 border border-border focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none transition-all duration-200 font-sans text-text-primary"
        />
      </div>

      <div>
        <label htmlFor="organization" className="block font-sans text-sm text-text-primary mb-1.5">
          Organization
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          className="w-full px-4 h-11 border border-border focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none transition-all duration-200 font-sans text-text-primary"
        />
      </div>

      <div>
        <label htmlFor="role" className="block font-sans text-sm text-text-primary mb-1.5">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="w-full px-4 h-11 border border-border focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none transition-all duration-200 font-sans text-text-primary bg-white"
        >
          <option value="">Select your role</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-sans text-sm text-text-primary mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none transition-all duration-200 font-sans text-text-primary resize-vertical"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full h-12 bg-navy hover:bg-navy-dark disabled:opacity-60 text-white font-sans text-btn transition-colors duration-200"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
