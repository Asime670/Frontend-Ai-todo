"use client";

import React, { useState } from "react";
import { TaskItem } from "@/components/tasks/TaskItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Plus } from "lucide-react";
import { getTodayString } from "@/lib/date-utils";

export function TodayTasks({
  tasks = [],
  onToggle,
  onEdit,
  onDelete,
  onSelect,
  onQuickCreate,
}) {
  const [quickTitle, setQuickTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickTitle.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onQuickCreate({
        title: quickTitle.trim(),
        dueDate: getTodayString(),
        priority: "medium",
        status: "pending",
      });
      setQuickTitle("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#1E1E1E]">Today's Focus</h2>
        <span className="text-xs text-[#6B7280]">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Quick Add Inline Field */}
      <form onSubmit={handleQuickSubmit} className="flex gap-2">
        <input
          type="text"
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          placeholder="Add a task for today and press Enter..."
          className="flex-1 px-3 py-2 text-sm text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md placeholder-[#9CA3AF] transition-colors focus:outline-none focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F]"
        />
        <Button
          type="submit"
          variant="secondary"
          size="md"
          disabled={!quickTitle.trim() || isSubmitting}
          loading={isSubmitting}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.2]" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </form>

      {/* List or Empty State */}
      {tasks.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="No tasks scheduled for today"
          description="You are caught up for today. Add a new action item above or plan ahead."
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
