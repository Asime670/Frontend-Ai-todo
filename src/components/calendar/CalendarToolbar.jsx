"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function CalendarToolbar({
  title,
  viewMode, // "month" | "week"
  onViewModeChange,
  onPrevious,
  onNext,
  onToday,
  onCreateForDate,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
      {/* Title & Navigation */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-[#1E1E1E] min-w-[180px]">
          {title}
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrevious}
            className="p-1.5 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F2] rounded border border-[#E2E8F0] transition-colors"
            aria-label="Previous period"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="p-1.5 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F2] rounded border border-[#E2E8F0] transition-colors"
            aria-label="Next period"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={onToday}
            className="ml-1 text-xs"
          >
            Today
          </Button>
        </div>
      </div>

      {/* View Switcher & Action */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#F3F4F2] p-1 rounded-md">
          <button
            type="button"
            onClick={() => onViewModeChange("month")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              viewMode === "month"
                ? "bg-white text-[#1E1E1E] shadow-sm"
                : "text-[#6B7280] hover:text-[#1F2937]"
            )}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("week")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              viewMode === "week"
                ? "bg-white text-[#1E1E1E] shadow-sm"
                : "text-[#6B7280] hover:text-[#1F2937]"
            )}
          >
            Week
          </button>
        </div>

        {onCreateForDate && (
          <Button
            variant="primary"
            size="sm"
            onClick={onCreateForDate}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        )}
      </div>
    </div>
  );
}
