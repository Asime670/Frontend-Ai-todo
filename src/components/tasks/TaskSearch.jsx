"use client";

import React from "react";
import { Search, X } from "lucide-react";

export function TaskSearch({ value, onChange, placeholder = "Search tasks by title, tag, or note..." }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 text-sm text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md placeholder-[#9CA3AF] transition-colors focus:outline-none focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#9CA3AF] hover:text-[#1F2937] rounded"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
