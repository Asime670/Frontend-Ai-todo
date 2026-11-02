"use client";

import React from "react";
import Link from "next/link";
import { CheckSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-[#52796F] text-white">
            <CheckSquare className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#1E1E1E]">
            Minimalist Task Workspace
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#6B7280]">
          <Link href="/dashboard" className="hover:text-[#1E1E1E] transition-colors">
            Workspace
          </Link>
          <Link href="/login" className="hover:text-[#1E1E1E] transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="hover:text-[#1E1E1E] transition-colors">
            Sign Up
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#1E1E1E] transition-colors"
          >
            Documentation
          </a>
        </div>

        <p className="text-xs text-[#9CA3AF]">
          &copy; {new Date().getFullYear()} Minimalist. Calm productivity.
        </p>
      </div>
    </footer>
  );
}
