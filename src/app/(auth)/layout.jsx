"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CheckSquare } from "lucide-react";

export default function AuthLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-[#FAFAFA]">
      <div className="w-full max-w-sm space-y-6">
        {/* Wordmark */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 group mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[#52796F] text-white transition-colors group-hover:bg-[#42665D]">
              <CheckSquare className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-semibold text-base tracking-tight text-[#1E1E1E]">
              Minimalist
            </span>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 sm:p-7 shadow-xs">
          {children}
        </div>
      </div>
    </div>
  );
}
