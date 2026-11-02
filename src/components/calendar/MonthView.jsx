"use client";

import React from "react";
import { getCalendarGrid, getTodayString, isSameDay } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MonthView({
  year,
  monthIndex,
  tasks = [],
  selectedDate,
  onSelectDate,
}) {
  const days = getCalendarGrid(year, monthIndex);
  const today = getTodayString();

  // Group tasks by date string
  const tasksByDate = {};
  tasks.forEach((t) => {
    if (t.dueDate) {
      if (!tasksByDate[t.dueDate]) tasksByDate[t.dueDate] = [];
      tasksByDate[t.dueDate].push(t);
    }
  });

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      {/* Day header row */}
      <div className="grid grid-cols-7 border-b border-[#E2E8F0] bg-[#FAFAFA] text-center">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid of days */}
      <div className="grid grid-cols-7 divide-x divide-y divide-[#E2E8F0]">
        {days.map((cell) => {
          const isSelected = isSameDay(cell.dateString, selectedDate);
          const isCurrentToday = isSameDay(cell.dateString, today);
          const dayTasks = tasksByDate[cell.dateString] || [];
          const hasTasks = dayTasks.length > 0;
          const completedCount = dayTasks.filter((t) => t.completed).length;

          return (
            <div
              key={cell.dateString}
              onClick={() => onSelectDate(cell.dateString)}
              className={cn(
                "min-h-[85px] sm:min-h-[105px] p-1.5 sm:p-2 cursor-pointer transition-colors relative flex flex-col justify-between",
                !cell.isCurrentMonth && "bg-[#FAFAFA]/70 text-[#9CA3AF]",
                isSelected
                  ? "bg-[#EBF1EE]/60 ring-2 ring-inset ring-[#52796F]"
                  : "hover:bg-[#F3F4F2]/50"
              )}
            >
              {/* Day Number and status badge */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full",
                    isCurrentToday
                      ? "bg-[#52796F] text-white font-semibold"
                      : cell.isCurrentMonth
                      ? "text-[#1E1E1E]"
                      : "text-[#9CA3AF]"
                  )}
                >
                  {cell.dayNumber}
                </span>

                {hasTasks && (
                  <span className="text-[10px] text-[#6B7280] hidden sm:inline">
                    {completedCount}/{dayTasks.length}
                  </span>
                )}
              </div>

              {/* Task Items / Dots Preview */}
              <div className="space-y-1 mt-1 flex-1 overflow-hidden">
                {dayTasks.slice(0, 2).map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded truncate font-medium border",
                      t.completed
                        ? "bg-[#F3F4F2] text-[#9CA3AF] border-transparent line-through"
                        : "bg-white text-[#1F2937] border-[#E2E8F0]"
                    )}
                    title={t.title}
                  >
                    {t.title}
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <p className="text-[9px] text-[#6B7280] font-medium pl-1">
                    +{dayTasks.length - 2} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
