"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  className,
  variant = "primary", // primary, secondary, outline, ghost, danger
  size = "md", // sm, md, lg
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md";

  const variants = {
    primary:
      "bg-[#52796F] text-white hover:bg-[#42665D] focus-visible:ring-[#52796F] active:bg-[#38564E]",
    secondary:
      "bg-[#F3F4F2] text-[#1F2937] hover:bg-[#E8EAE6] focus-visible:ring-stone-400 active:bg-[#DDE0DA] border border-[#E2E8F0]",
    outline:
      "bg-transparent text-[#1F2937] border border-[#E2E8F0] hover:bg-[#F3F4F2] focus-visible:ring-stone-400",
    ghost:
      "bg-transparent text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F2] focus-visible:ring-stone-400",
    danger:
      "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 focus-visible:ring-rose-500",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5 h-8 gap-1.5",
    md: "text-sm px-3.5 py-2 h-9 gap-2",
    lg: "text-base px-4 py-2.5 h-10 gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {children}
    </button>
  );
}
