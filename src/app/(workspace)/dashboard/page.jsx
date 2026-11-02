"use client";

import React, { useState, useMemo } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { TaskSummary } from "@/components/dashboard/TaskSummary";
import { CompletionProgress } from "@/components/dashboard/CompletionProgress";
import { TodayTasks } from "@/components/dashboard/TodayTasks";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { TaskDetails } from "@/components/tasks/TaskDetails";
import { TaskForm } from "@/components/tasks/TaskForm";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";
import { Modal } from "@/components/ui/Modal";
import { useTasks } from "@/hooks/useTasks";
import { isDateToday, isDateUpcoming, isDateOverdue } from "@/lib/date-utils";

export default function DashboardPage() {
  const {
    allTasks,
    loading,
    error,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    submitting,
  } = useTasks();

  // Active interaction states
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Derive counts from actual task data
  const total = allTasks.length;
  const completed = allTasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const overdue = allTasks.filter((t) => isDateOverdue(t.dueDate, t.completed)).length;

  // Filter tasks for Today and Upcoming
  const todayTasks = useMemo(() => {
    return allTasks.filter((t) => {
      if (t.completed) {
        return isDateToday(t.dueDate);
      }
      return isDateToday(t.dueDate) || isDateOverdue(t.dueDate, false);
    });
  }, [allTasks]);

  const upcomingTasks = useMemo(() => {
    return allTasks.filter((t) => isDateUpcoming(t.dueDate));
  }, [allTasks]);

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
    <PageContainer className="space-y-7">
      {/* Welcome & Date Section */}
      <WelcomeSection />

      {/* Task Summary & Progress Grid */}
      <div className="space-y-4">
        <TaskSummary
          total={total}
          completed={completed}
          remaining={remaining}
          overdue={overdue}
        />
        <CompletionProgress completed={completed} total={total} />
      </div>

      {/* Task Columns / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Today's Tasks & Overdue */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
          <TodayTasks
            tasks={todayTasks}
            onToggle={toggleTask}
            onEdit={(task) => setEditingTask(task)}
            onDelete={(task) => setDeletingTask(task)}
            onSelect={(task) => setSelectedTask(task)}
            onQuickCreate={createTask}
          />
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
          <UpcomingTasks
            tasks={upcomingTasks}
            onToggle={toggleTask}
            onEdit={(task) => setEditingTask(task)}
            onDelete={(task) => setDeletingTask(task)}
            onSelect={(task) => setSelectedTask(task)}
          />
        </div>
      </div>

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

      {/* Edit Task Modal */}
      <Modal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTask(null)}
          loading={submitting}
        />
      </Modal>

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
