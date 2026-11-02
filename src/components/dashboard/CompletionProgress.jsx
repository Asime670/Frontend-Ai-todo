"use client";

import React from "react";

export function CompletionProgress({ completed = 0, total = 0 }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#1E1E1E]">Daily Completion</span>
        <span className="text-[#6B7280]">
          {completed} of {total} completed ({percentage}%)
        </span>
      </div>

      <div className="w-full h-2 bg-[#F3F4F2] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#52796F] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
