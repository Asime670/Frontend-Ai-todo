"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(function Input(
  {
    className,
    type = "text",
    label,
    error,
    helperText,
    id,
    disabled,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-[#1F2937]"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 text-sm text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md placeholder-[#9CA3AF]",
          "transition-colors duration-150 ease-in-out",
          "focus:outline-none focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F]",
          "disabled:bg-[#F3F4F2] disabled:cursor-not-allowed disabled:text-[#9CA3AF]",
          error && "border-rose-400 focus:border-rose-500 focus:ring-rose-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-rose-600">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-[#6B7280]">{helperText}</p>
      )}
    </div>
  );
});
