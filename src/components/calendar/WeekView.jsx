"use client";

import React from "react";
import { getWeekDays, getTodayString, isSameDay } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

export function WeekView({
  referenceDate,
  tasks = [],
  selectedDate,
  onSelectDate,
}) {
  const days = getWeekDays(referenceDate);
  const today = getTodayString();

  const tasksByDate = {};
  tasks.forEach((t) => {
    if (t.dueDate) {
      if (!tasksByDate[t.dueDate]) tasksByDate[t.dueDate] = [];
      tasksByDate[t.dueDate].push(t);
    }
  });

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-x-auto">
      <div className="min-w-[650px] grid grid-cols-7 divide-x divide-[#E2E8F0]">
        {days.map((day) => {
          const isSelected = isSameDay(day.dateString, selectedDate);
          const isCurrentToday = isSameDay(day.dateString, today);
          const dayTasks = tasksByDate[day.dateString] || [];

          return (
            <div
              key={day.dateString}
              onClick={() => onSelectDate(day.dateString)}
              className={cn(
                "p-3 min-h-[220px] cursor-pointer transition-colors flex flex-col",
                isSelected
                  ? "bg-[#EBF1EE]/60 ring-2 ring-inset ring-[#52796F]"
                  : "hover:bg-[#F3F4F2]/50"
              )}
            >
              <div className="text-center pb-2 border-b border-[#E2E8F0]/70">
                <p className="text-[11px] font-semibold uppercase text-[#6B7280]">
                  {day.dayName}
                </p>
                <div className="flex justify-center mt-1">
                  <span
                    className={cn(
                      "text-xs font-semibold w-7 h-7 flex items-center justify-center rounded-full",
                      isCurrentToday
                        ? "bg-[#52796F] text-white"
                        : "text-[#1E1E1E]"
                    )}
                  >
                    {day.dayNumber}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 mt-3 flex-1 overflow-y-auto max-h-[240px]">
                {dayTasks.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "p-1.5 rounded text-xs border font-medium",
                      t.completed
                        ? "bg-[#F3F4F2] text-[#9CA3AF] line-through border-transparent"
                        : "bg-white text-[#1F2937] border-[#E2E8F0] shadow-2xs"
                    )}
                    title={t.title}
                  >
                    <p className="truncate">{t.title}</p>
                    {t.dueTime && (
                      <span className="text-[10px] text-[#6B7280]">
                        {t.dueTime}
                      </span>
                    )}
                  </div>
                ))}
                {dayTasks.length === 0 && (
                  <p className="text-[11px] text-[#9CA3AF] text-center pt-4 italic">
                    No tasks
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
