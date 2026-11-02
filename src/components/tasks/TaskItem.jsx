"use client";

import React from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Tag,
} from "lucide-react";
import {
  formatDisplayDate,
  isDateOverdue,
  isDateToday,
} from "@/lib/date-utils";
import { cn } from "@/lib/utils";

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onSelect,
}) {
  const isCompleted = task.completed;
  const isOverdue = isDateOverdue(task.dueDate, isCompleted);
  const isToday = isDateToday(task.dueDate);

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between gap-3 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg transition-colors duration-150",
        "hover:border-[#CBD5E1] hover:bg-stone-50/50",
        isCompleted && "bg-[#FAFAFA] border-[#E2E8F0]/70"
      )}
    >
      {/* Left: Checkbox & Details */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="pt-0.5">
          <Checkbox
            checked={isCompleted}
            onChange={() => onToggle && onToggle(task.id, isCompleted)}
            ariaLabel={`Mark "${task.title}" as ${isCompleted ? "pending" : "completed"}`}
          />
        </div>

        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={() => onSelect && onSelect(task)}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isCompleted
                  ? "line-through text-[#9CA3AF]"
                  : "text-[#1E1E1E] group-hover:text-black"
              )}
            >
              {task.title}
            </span>

            {/* Priority Badge */}
            {task.priority && task.priority !== "medium" && (
              <Badge variant={task.priority} className="capitalize">
                {task.priority}
              </Badge>
            )}

            {/* Optional category */}
            {task.category && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#6B7280] bg-[#F3F4F2] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                <Tag className="w-2.5 h-2.5 text-[#9CA3AF]" />
                {task.category}
              </span>
            )}
          </div>

          {/* Description preview if exists */}
          {task.description && (
            <p
              className={cn(
                "text-xs line-clamp-1 mt-0.5",
                isCompleted ? "text-[#9CA3AF]" : "text-[#6B7280]"
              )}
            >
              {task.description}
            </p>
          )}

          {/* Date & Time indicators */}
          {(task.dueDate || task.dueTime) && (
            <div className="flex items-center gap-3 mt-1.5 text-[11px]">
              {task.dueDate && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 font-medium",
                    isCompleted
                      ? "text-[#9CA3AF]"
                      : isOverdue
                      ? "text-rose-700"
                      : isToday
                      ? "text-[#42665D]"
                      : "text-[#6B7280]"
                  )}
                >
                  <Calendar className="w-3 h-3" />
                  {formatDisplayDate(task.dueDate)}
                  {isOverdue && !isCompleted && " (Overdue)"}
                </span>
              )}

              {task.dueTime && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1",
                    isCompleted ? "text-[#9CA3AF]" : "text-[#6B7280]"
                  )}
                >
                  <Clock className="w-3 h-3" />
                  {task.dueTime}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-1.5 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F2] rounded transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="p-1.5 text-[#6B7280] hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
