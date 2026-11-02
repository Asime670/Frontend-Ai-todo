"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/constants/task-options";

export function TaskForm({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const isEditing = Boolean(initialData?.id);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate || "",
    dueTime: initialData?.dueTime || "",
    priority: initialData?.priority || "medium",
    status: initialData?.status || "pending",
    category: initialData?.category || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate || "",
        dueTime: initialData.dueTime || "",
        priority: initialData.priority || "medium",
        status: initialData.status || "pending",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        completed: formData.status === "completed",
      });
    } catch {
      // Error handling managed by caller / hooks
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <Input
        label="Task Title *"
        name="title"
        placeholder="e.g., Review contract amendments"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        autoFocus
      />

      {/* Description */}
      <div className="space-y-1.5">
        <label
          htmlFor="task-description"
          className="block text-xs font-medium text-[#1F2937]"
        >
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Add any context, links, or notes..."
          className="w-full px-3 py-2 text-sm text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md placeholder-[#9CA3AF] transition-colors focus:outline-none focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F]"
        />
      </div>

      {/* Date & Time Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          type="date"
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <Input
          type="time"
          label="Due Time"
          name="dueTime"
          value={formData.dueTime}
          onChange={handleChange}
        />
      </div>

      {/* Priority & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={TASK_PRIORITIES}
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={TASK_STATUSES}
        />
      </div>

      {/* Category */}
      <Input
        label="Category / Tag"
        name="category"
        placeholder="e.g., Work, Personal, Architecture"
        value={formData.category}
        onChange={handleChange}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={loading}
        >
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
