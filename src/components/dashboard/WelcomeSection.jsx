"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

export function WelcomeSection({ onQuickAdd }) {
  const { user } = useAuth();

  // Time-aware greeting
  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17) {
    greeting = "Good evening";
  }

  const name = user?.name?.split(" ")[0] || "";
  const displayGreeting = name ? `${greeting}, ${name}` : greeting;

  // Formatted date
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
      <div>
        <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          {todayFormatted}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E] mt-1">
          {displayGreeting}
        </h1>
        <p className="text-sm text-[#6B7280] mt-1 max-w-xl">
          Focus on your top priorities today. Keep momentum steady and deliberate.
        </p>
      </div>
    </div>
  );
}
