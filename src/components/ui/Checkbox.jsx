"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  className,
  id,
  ariaLabel = "Mark complete",
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      id={id}
      disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      className={cn(
        "relative flex items-center justify-center w-4 h-4 rounded border transition-all duration-150 shrink-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52796F] focus-visible:ring-offset-1",
        checked
          ? "bg-[#52796F] border-[#52796F] text-white"
          : "bg-white border-[#CBD5E1] hover:border-[#94A3B8]",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {checked && <Check className="w-3 h-3 stroke-[3]" />}
    </button>
  );
}
