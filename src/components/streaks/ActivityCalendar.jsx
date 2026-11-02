"use client";

import React, { useMemo } from "react";
import { toDateString } from "@/lib/date-utils";
import { AlertCircle, Info } from "lucide-react";

export function ActivityCalendar({
  activityHistory = [],
  isSupported = true,
  notice = null,
}) {
  // Generate the last 16 weeks (112 days) up to today
  const gridDays = useMemo(() => {
    const days = [];
    const today = new Date();
    // Start from Sunday 16 weeks ago
    const totalDays = 16 * 7;
    const start = new Date(today);
    start.setDate(today.getDate() - totalDays + (6 - today.getDay()));

    const countMap = {};
    activityHistory.forEach((item) => {
      if (item.date) {
        countMap[item.date] = item.count || 0;
      }
    });

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const ds = toDateString(d);
      days.push({
        date: ds,
        dayOfMonth: d.getDate(),
        count: countMap[ds] || 0,
      });
    }
    return days;
  }, [activityHistory]);

  const getColorClass = (count) => {
    if (!isSupported || count === 0) return "bg-[#F3F4F2] border-[#E2E8F0]";
    if (count <= 2) return "bg-[#D4E3DD] border-[#BDD4CB]";
    if (count <= 4) return "bg-[#98BEB2] border-[#7EAFA2]";
    return "bg-[#52796F] border-[#42665D]";
  };

  return (
    <div className="space-y-6">
      {/* Activity Heatmap Grid */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#1E1E1E]">
              Task Completion Activity
            </h3>
            <p className="text-xs text-[#6B7280]">
              Recorded daily task completions across recent weeks
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] self-start sm:self-auto">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-xs bg-[#F3F4F2] border border-[#E2E8F0]" />
            <div className="w-2.5 h-2.5 rounded-xs bg-[#D4E3DD] border border-[#BDD4CB]" />
            <div className="w-2.5 h-2.5 rounded-xs bg-[#98BEB2] border border-[#7EAFA2]" />
            <div className="w-2.5 h-2.5 rounded-xs bg-[#52796F] border border-[#42665D]" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap cells */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[580px]">
            {gridDays.map((cell) => (
              <div
                key={cell.date}
                className={`w-3.5 h-3.5 rounded-xs border transition-transform hover:scale-125 cursor-default ${getColorClass(
                  cell.count
                )}`}
                title={`${cell.date}: ${
                  isSupported ? `${cell.count} completed` : "No historical sync yet"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Backend Support Status Banner */}
        {!isSupported && (
          <div className="flex items-start gap-2.5 p-3 bg-[#F3F4F2] rounded border border-[#E2E8F0] text-xs text-[#6B7280]">
            <AlertCircle className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#1E1E1E]">
                Backend Streaks Endpoint Pending
              </p>
              <p className="mt-0.5">
                {notice ||
                  "The frontend is ready to ingest historical activity from GET /streaks. No fabricated metrics are displayed."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Explanation Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#1E1E1E]">
          <Info className="w-4 h-4 text-[#52796F]" />
          <h4>How Streaks Are Calculated</h4>
        </div>
        <p className="text-xs text-[#6B7280] leading-relaxed">
          A streak extends each calendar day in which you complete at least one
          task before midnight in your local timezone. Missing a calendar day
          resets the active streak, while your longest streak records your personal best.
        </p>
      </div>
    </div>
  );
}
