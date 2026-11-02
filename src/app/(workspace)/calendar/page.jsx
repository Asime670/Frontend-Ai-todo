"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { MonthView } from "@/components/calendar/MonthView";
import { WeekView } from "@/components/calendar/WeekView";
import { DayTasks } from "@/components/calendar/DayTasks";
import { TaskDetails } from "@/components/tasks/TaskDetails";
import { TaskForm } from "@/components/tasks/TaskForm";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";
import { Modal } from "@/components/ui/Modal";
import { useTasks } from "@/hooks/useTasks";
import {
  getTodayString,
  formatMonthYear,
  isSameDay,
} from "@/lib/date-utils";

export default function CalendarPage() {
  const {
    allTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    submitting,
  } = useTasks();

  const [viewMode, setViewMode] = useState("month"); // "month" | "week"
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  // Modal interaction states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();

  // Navigation handlers
  const handlePrevious = () => {
    const next = new Date(currentDate);
    if (viewMode === "month") {
      next.setMonth(next.getMonth() - 1);
    } else {
      next.setDate(next.getDate() - 7);
    }
    setCurrentDate(next);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    if (viewMode === "month") {
      next.setMonth(next.getMonth() + 1);
    } else {
      next.setDate(next.getDate() + 7);
    }
    setCurrentDate(next);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(getTodayString());
  };

  // Selected date tasks
  const tasksForSelectedDay = allTasks.filter(
    (t) => t.dueDate && isSameDay(t.dueDate, selectedDate)
  );

  const handleCreateSubmit = async (payload) => {
    await createTask({ ...payload, dueDate: selectedDate });
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

  const toolbarTitle =
    viewMode === "month"
      ? formatMonthYear(year, monthIndex)
      : `Week of ${currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;

  return (
    <PageContainer className="space-y-6">
      {/* Calendar Header & Toolbar */}
      <CalendarToolbar
        title={toolbarTitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onCreateForDate={() => setIsCreateOpen(true)}
      />

      {/* Main Calendar View & Day Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Calendar Grid View (2 cols on lg) */}
        <div className="lg:col-span-2">
          {viewMode === "month" ? (
            <MonthView
              year={year}
              monthIndex={monthIndex}
              tasks={allTasks}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          ) : (
            <WeekView
              referenceDate={currentDate}
              tasks={allTasks}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>

        {/* Selected Day Task Panel (1 col on lg) */}
        <div>
          <DayTasks
            selectedDate={selectedDate}
            tasks={tasksForSelectedDay}
            onToggle={toggleTask}
            onEdit={(task) => setEditingTask(task)}
            onDelete={(task) => setDeletingTask(task)}
            onSelect={(task) => setSelectedTask(task)}
            onCreateForDate={createTask}
          />
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Schedule Task"
        description={`Add a new task for ${selectedDate}`}
      >
        <TaskForm
          initialData={{ dueDate: selectedDate }}
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
