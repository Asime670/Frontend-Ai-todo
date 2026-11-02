"use client";

import React, { useState } from "react";
import { TaskItem } from "@/components/tasks/TaskItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Plus, Calendar } from "lucide-react";
import { formatDisplayDate } from "@/lib/date-utils";

export function DayTasks({
  selectedDate,
  tasks = [],
  onToggle,
  onEdit,
  onDelete,
  onSelect,
  onCreateForDate,
}) {
  const [quickTitle, setQuickTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!quickTitle.trim() || submitting) return;

    try {
      setSubmitting(true);
      await onCreateForDate({
        title: quickTitle.trim(),
        dueDate: selectedDate,
        priority: "medium",
        status: "pending",
      });
      setQuickTitle("");
    } finally {
      setSubmitting(false);
    }
  };

  const formattedDate = formatDisplayDate(selectedDate);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-sm font-semibold text-[#1E1E1E]">
            Tasks for {formattedDate || "Selected Date"}
          </h3>
          <p className="text-xs text-[#6B7280]">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"} scheduled
          </p>
        </div>
      </div>

      {/* Inline Quick Add for this date */}
      <form onSubmit={handleQuickAdd} className="flex gap-2">
        <input
          type="text"
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          placeholder={`Add a task for ${formattedDate}...`}
          className="flex-1 px-3 py-1.5 text-xs text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md placeholder-[#9CA3AF] focus:outline-none focus:border-[#52796F]"
        />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          disabled={!quickTitle.trim() || submitting}
          loading={submitting}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </Button>
      </form>

      {/* Task list or empty state */}
      {tasks.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No tasks on this date"
          description="Click above to schedule a task or pick another date from the calendar."
          className="p-6"
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
