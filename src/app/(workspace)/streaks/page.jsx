"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StreakSummary } from "@/components/streaks/StreakSummary";
import { ActivityCalendar } from "@/components/streaks/ActivityCalendar";
import { streakService } from "@/services/streakService";
import { useTasks } from "@/hooks/useTasks";
import { isDateToday } from "@/lib/date-utils";

export default function StreaksPage() {
  const { allTasks } = useTasks();
  const [streakData, setStreakData] = useState({
    isSupported: true,
    currentStreak: 0,
    longestStreak: 0,
    completedToday: 0,
    activityHistory: [],
    message: null,
  });
  const [loading, setLoading] = useState(true);

  // Completed today derived safely from verified today tasks
  const completedTodayFromTasks = allTasks.filter(
    (t) => t.completed && isDateToday(t.dueDate)
  ).length;

  useEffect(() => {
    let isMounted = true;
    async function loadStreaks() {
      try {
        const res = await streakService.getStreakData();
        if (isMounted) {
          setStreakData({
            isSupported: res.isSupported,
            currentStreak: res.currentStreak,
            longestStreak: res.longestStreak,
            completedToday: res.isSupported
              ? res.completedToday
              : completedTodayFromTasks,
            activityHistory: res.activityHistory,
            message: res.message,
          });
        }
      } catch (err) {
        if (isMounted) {
          setStreakData({
            isSupported: false,
            currentStreak: 0,
            longestStreak: 0,
            completedToday: completedTodayFromTasks,
            activityHistory: [],
            message:
              "Backend streaks service is currently offline. Historical logs will display once connected.",
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStreaks();
    return () => {
      isMounted = false;
    };
  }, [completedTodayFromTasks]);

  return (
    <PageContainer className="space-y-6">
      {/* Page Title */}
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">
          Habits & Streaks
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Measure daily consistency and build unbroken momentum over time
        </p>
      </div>

      {/* Streak Summary Metrics */}
      <StreakSummary
        currentStreak={streakData.currentStreak}
        longestStreak={streakData.longestStreak}
        completedToday={streakData.completedToday}
        isSupported={streakData.isSupported}
      />

      {/* Activity Heatmap & Calculation Details */}
      <ActivityCalendar
        activityHistory={streakData.activityHistory}
        isSupported={streakData.isSupported}
        notice={streakData.message}
      />
    </PageContainer>
  );
}
