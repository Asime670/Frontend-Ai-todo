"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskSearch } from "@/components/tasks/TaskSearch";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskDetails } from "@/components/tasks/TaskDetails";
import { TaskForm } from "@/components/tasks/TaskForm";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useTasks } from "@/hooks/useTasks";
import { Plus } from "lucide-react";

export default function TasksPage() {
  const {
    tasks,
    loading,
    error,
    submitting,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const handleCreateSubmit = async (payload) => {
    await createTask(payload);
    setIsCreateOpen(false);
  };

  const handleEditSubmit = async (payload) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, payload);
    setEditingTask(null);
    if (selectedTask?.id === editingTask.id) {
      setSelectedTask(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTask) return;
    await deleteTask(deletingTask.id);
    setDeletingTask(null);
    if (selectedTask?.id === deletingTask.id) {
      setSelectedTask(null);
    }
  };

  return (
    <PageContainer className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">
            Tasks
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage, organize, and filter all workspace priorities
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreateOpen(true)}
          className="gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.2]" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-3">
        <TaskSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by title, description, or tag..."
        />

        <TaskFilters
          status={statusFilter}
          onStatusChange={setStatusFilter}
          priority={priorityFilter}
          onPriorityChange={setPriorityFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={tasks.length}
        />
      </div>

      {/* Task Count Header */}
      <div className="flex items-center justify-between text-xs text-[#6B7280]">
        <span>
          Showing {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggle={toggleTask}
        onEdit={(task) => setEditingTask(task)}
        onDelete={(task) => setDeletingTask(task)}
        onSelect={(task) => setSelectedTask(task)}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Task"
        description="Enter the task title and optional scheduling details"
      >
        <TaskForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateOpen(false)}
          loading={submitting}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
        description="Modify task details and save changes"
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTask(null)}
          loading={submitting}
        />
      </Modal>

      {/* Task Details Modal */}
      <TaskDetails
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onToggle={toggleTask}
        onEdit={(task) => {
          setSelectedTask(null);
          setEditingTask(task);
        }}
        onDelete={(task) => {
          setSelectedTask(null);
          setDeletingTask(task);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTaskDialog
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
        task={deletingTask}
        loading={submitting}
      />
    </PageContainer>
  );
}
