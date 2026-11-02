"use client";

import React from "react";
import { TASK_PRIORITIES, SORT_OPTIONS } from "@/constants/task-options";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

export function TaskFilters({
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortChange,
  totalCount = 0,
}) {
  const statusTabs = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
      {/* Status Segmented Tabs */}
      <div className="flex items-center gap-1 bg-[#F3F4F2] p-1 rounded-md overflow-x-auto">
        {statusTabs.map((tab) => {
          const isActive = status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onStatusChange(tab.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap",
                isActive
                  ? "bg-white text-[#1E1E1E] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1F2937]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Priority and Sort Controls */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="text-xs text-[#1F2937] bg-white border border-[#E2E8F0] rounded px-2 py-1.5 focus:outline-none focus:border-[#52796F]"
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            {TASK_PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} Priority
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs text-[#1F2937] bg-white border border-[#E2E8F0] rounded px-2 py-1.5 focus:outline-none focus:border-[#52796F]"
          aria-label="Sort tasks by"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
