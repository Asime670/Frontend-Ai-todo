"use client";

import React from "react";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Plus, CheckCircle2, AlertTriangle } from "lucide-react";

export function TaskList({
  tasks = [],
  loading = false,
  error = null,
  onToggle,
  onEdit,
  onDelete,
  onSelect,
  onCreateClick,
}) {
  if (loading) {
    return (
      <div className="space-y-2.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="flex items-center gap-3 p-4 bg-white border border-[#E2E8F0] rounded-lg"
          >
            <Skeleton className="w-4 h-4 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
            </div>
            <Skeleton className="w-12 h-5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800">
        <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
        <div className="flex-1 text-xs">
          <p className="font-semibold text-rose-900">Unable to load tasks</p>
          <p className="mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="No tasks in this view"
        description="Everything looks clear here. Plan ahead by adding your next priority."
        action={
          onCreateClick && (
            <Button
              size="sm"
              variant="primary"
              onClick={onCreateClick}
              className="gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add New Task</span>
            </Button>
          )
        }
      />
    );
  }

  return (
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
  );
}
