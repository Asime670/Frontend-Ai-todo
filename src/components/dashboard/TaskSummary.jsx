"use client";

import React from "react";
import { CheckCircle2, Clock, ListTodo, AlertCircle } from "lucide-react";

export function TaskSummary({ total = 0, completed = 0, remaining = 0, overdue = 0 }) {
  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ListTodo,
      iconColor: "text-[#6B7280]",
      bg: "bg-[#F3F4F2]",
    },
    {
      label: "Remaining",
      value: remaining,
      icon: Clock,
      iconColor: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      iconColor: "text-[#42665D]",
      bg: "bg-[#EBF1EE]",
    },
    ...(overdue > 0
      ? [
          {
            label: "Overdue",
            value: overdue,
            icon: AlertCircle,
            iconColor: "text-rose-600",
            bg: "bg-rose-50",
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3.5 p-4 bg-white border border-[#E2E8F0] rounded-lg"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-md shrink-0 ${stat.bg}`}
            >
              <Icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#6B7280] truncate">
                {stat.label}
              </p>
              <p className="text-xl font-bold tracking-tight text-[#1E1E1E]">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
