"use client";

import React from "react";
import { Flame, Award, CheckCircle2 } from "lucide-react";

export function StreakSummary({
  currentStreak = 0,
  longestStreak = 0,
  completedToday = 0,
  isSupported = true,
}) {
  const cards = [
    {
      label: "Current Streak",
      value: `${currentStreak} ${currentStreak === 1 ? "day" : "days"}`,
      subtext: currentStreak > 0 ? "Daily consistency active" : "Complete a task today",
      icon: Flame,
      color: "text-[#52796F]",
      bg: "bg-[#EBF1EE]",
    },
    {
      label: "Longest Streak",
      value: `${longestStreak} ${longestStreak === 1 ? "day" : "days"}`,
      subtext: "Personal all-time record",
      icon: Award,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      label: "Completed Today",
      value: `${completedToday} ${completedToday === 1 ? "task" : "tasks"}`,
      subtext: "Recorded completions today",
      icon: CheckCircle2,
      color: "text-[#42665D]",
      bg: "bg-[#F3F4F2]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="p-5 bg-white border border-[#E2E8F0] rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B7280]">
                {card.label}
              </span>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-md ${card.bg}`}
              >
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold tracking-tight text-[#1E1E1E]">
                {card.value}
              </p>
              <p className="text-xs text-[#6B7280] mt-0.5">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
