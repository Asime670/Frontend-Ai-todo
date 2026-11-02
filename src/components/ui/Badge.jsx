"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-[#F3F4F2] text-[#1F2937] border-[#E2E8F0]",
    sage: "bg-[#EBF1EE] text-[#42665D] border-[#D1E0D9]",
    muted: "bg-gray-100 text-[#6B7280] border-gray-200",
    low: "bg-stone-100 text-stone-700 border-stone-200",
    medium: "bg-amber-50 text-amber-800 border-amber-200",
    high: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border tracking-tight",
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
}
