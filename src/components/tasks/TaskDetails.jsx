"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Calendar,
  Clock,
  Tag,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  formatDisplayDate,
  isDateOverdue,
  isDateToday,
} from "@/lib/date-utils";

export function TaskDetails({
  isOpen,
  onClose,
  task,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (!task) return null;

  const isCompleted = task.completed;
  const isOverdue = isDateOverdue(task.dueDate, isCompleted);
  const isToday = isDateToday(task.dueDate);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Task Details"
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        {/* Header with completion toggle and title */}
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Checkbox
              checked={isCompleted}
              onChange={() => {
                onToggle(task.id, isCompleted);
                onClose();
              }}
            />
          </div>
          <div className="flex-1">
            <h2
              className={`text-base font-semibold leading-snug ${
                isCompleted ? "line-through text-[#9CA3AF]" : "text-[#1E1E1E]"
              }`}
            >
              {task.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant={task.priority} className="capitalize">
                {task.priority} Priority
              </Badge>
              <Badge variant={isCompleted ? "sage" : "default"} className="capitalize">
                {task.status?.replace("_", " ")}
              </Badge>
              {task.category && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[#6B7280] bg-[#F3F4F2] px-2 py-0.5 rounded border border-[#E2E8F0]">
                  <Tag className="w-3 h-3 text-[#9CA3AF]" />
                  {task.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div className="bg-[#FAFAFA] p-3.5 rounded-md border border-[#E2E8F0]">
            <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-1">
              Description
            </p>
            <p className="text-sm text-[#1F2937] whitespace-pre-wrap leading-relaxed">
              {task.description}
            </p>
          </div>
        )}

        {/* Timing Information */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-md border border-[#E2E8F0] bg-white">
            <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Due Date</span>
            </div>
            <p
              className={`font-medium ${
                isOverdue
                  ? "text-rose-700 font-semibold"
                  : isToday
                  ? "text-[#42665D]"
                  : "text-[#1F2937]"
              }`}
            >
              {task.dueDate ? formatDisplayDate(task.dueDate) : "No date set"}
              {isOverdue && " (Overdue)"}
            </p>
          </div>

          <div className="p-3 rounded-md border border-[#E2E8F0] bg-white">
            <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Due Time</span>
            </div>
            <p className="font-medium text-[#1F2937]">
              {task.dueTime || "No time specified"}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onClose();
              onDelete(task);
            }}
            className="gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
              className="gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Task</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
