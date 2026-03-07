"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#102a4c] mb-2">
          Email Verified
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Your email has been verified. Once ApalyRx approves your account, you
          can sign in to your partner dashboard.
        </p>
        <Link
          href="/partners"
          className="inline-block px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors text-sm"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}
