"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export function DeleteTaskDialog({
  isOpen,
  onClose,
  onConfirm,
  task,
  loading = false,
}) {
  if (!task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-[#1F2937]">
              Are you sure you want to permanently delete this task?
            </p>
            <p className="text-xs font-semibold text-[#1E1E1E] mt-1 bg-[#F3F4F2] p-2 rounded border border-[#E2E8F0]">
              &ldquo;{task.title}&rdquo;
            </p>
            <p className="text-xs text-[#6B7280] mt-2">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            onClick={onConfirm}
            loading={loading}
          >
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
