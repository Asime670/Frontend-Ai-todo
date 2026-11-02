"use client";

import React from "react";
import { CheckSquare, CalendarDays, Flame, Sparkles } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Focused Daily Planning",
      description:
        "Surface only what matters today. Keep task lists readable, prioritize deliberately, and eliminate distracting dashboard clutter.",
      icon: CheckSquare,
    },
    {
      title: "Calendar Integration",
      description:
        "Visualize your deadlines across month and week views. Schedule upcoming tasks without date confusion or time zone drift.",
      icon: CalendarDays,
    },
    {
      title: "Habit Streaks",
      description:
        "Build long-term momentum. Track daily completion streaks calculated solely from verified completion records.",
      icon: Flame,
    },
    {
      title: "Optional AI Assistance",
      description:
        "Future-ready endpoints for smart categorization and schedule suggestions, designed as supportive capabilities rather than noise.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-[#E2E8F0] bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
            Designed for deliberate progress
          </h2>
          <p className="text-sm text-[#6B7280] mt-2">
            Every feature serves a direct purpose. No unnecessary complexity, no synthetic bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 bg-[#FAFAFA] border border-[#E2E8F0] rounded-lg space-y-3"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-[#EBF1EE] text-[#52796F]">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-semibold text-[#1E1E1E]">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
