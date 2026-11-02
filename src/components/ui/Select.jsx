"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const Select = forwardRef(function Select(
  {
    className,
    label,
    error,
    helperText,
    id,
    disabled,
    options = [],
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-medium text-[#1F2937]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full appearance-none px-3 py-2 pr-8 text-sm text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md",
            "transition-colors duration-150 ease-in-out",
            "focus:outline-none focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F]",
            "disabled:bg-[#F3F4F2] disabled:cursor-not-allowed disabled:text-[#9CA3AF]",
            error && "border-rose-400 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
      </div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-[#6B7280]">{helperText}</p>
      )}
    </div>
  );
});
