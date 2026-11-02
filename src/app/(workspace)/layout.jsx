"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Header } from "@/components/layout/Header";
import { Modal } from "@/components/ui/Modal";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTasks } from "@/hooks/useTasks";

export default function WorkspaceLayout({ children }) {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const { createTask, submitting } = useTasks();

  const handleQuickTaskCreate = async (taskData) => {
    await createTask(taskData);
    setIsQuickAddOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA]">
      {/* Mobile Drawer & Header */}
      <MobileNav />

      {/* Desktop Sticky Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onQuickAdd={() => setIsQuickAddOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Quick Add Task Modal */}
      <Modal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        title="Create New Task"
        description="Quickly capture a priority item in your workspace"
      >
        <TaskForm
          onSubmit={handleQuickTaskCreate}
          onCancel={() => setIsQuickAddOpen(false)}
          loading={submitting}
        />
      </Modal>
    </div>
  );
}
