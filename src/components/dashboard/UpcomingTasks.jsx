"use client";

import React from "react";
import { TaskItem } from "@/components/tasks/TaskItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar } from "lucide-react";

export function UpcomingTasks({
  tasks = [],
  onToggle,
  onEdit,
  onDelete,
  onSelect,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#1E1E1E]">Upcoming</h2>
        <span className="text-xs text-[#6B7280]">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No upcoming tasks"
          description="Your upcoming schedule is clear. Plan ahead by scheduling deadlines in the Tasks view."
        />
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
