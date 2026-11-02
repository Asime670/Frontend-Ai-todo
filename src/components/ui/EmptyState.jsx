"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export function EmptyState({
  icon: Icon = CheckCircle2,
  title = "No tasks found",
  description = "Get started by adding your first task or relaxing for the day.",
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[#E2E8F0] rounded-lg bg-white/60",
        className
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F3F4F2] text-[#52796F] mb-3">
        <Icon className="w-5 h-5 stroke-[1.75]" />
      </div>
      <h4 className="text-sm font-semibold text-[#1E1E1E] mb-1">{title}</h4>
      <p className="text-xs text-[#6B7280] max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
