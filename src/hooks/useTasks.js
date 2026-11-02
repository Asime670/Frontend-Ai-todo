"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { taskService } from "@/services/taskService";
import { getDevFallbackTasks, saveDevFallbackTasks } from "@/lib/dev-tasks";

export function useTasks(initialFilters = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filters state
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || "all");
  const [priorityFilter, setPriorityFilter] = useState(initialFilters.priority || "all");
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || "");
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "dueDate_asc");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.getTasks({
        status: statusFilter,
        priority: priorityFilter,
        search: searchQuery,
      });
      setTasks(res.tasks);
      setIsDemoMode(false);
    } catch (err) {
      console.warn("Backend tasks fetch notice:", err.message);
      // If network unreachable or 404, fall back to isolated dev demonstration data
      if (err.status === 0 || err.status === 404) {
        setIsDemoMode(true);
        const fallback = getDevFallbackTasks();
        setTasks(fallback);
      } else {
        setError(err.message || "Failed to load tasks");
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, searchQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create Task
  const createTask = useCallback(
    async (taskData) => {
      setSubmitting(true);
      setError(null);
      try {
        if (isDemoMode) {
          const newTask = {
            id: `task-${Date.now()}`,
            ...taskData,
            completed: taskData.status === "completed",
            createdAt: new Date().toISOString(),
          };
          const updated = [newTask, ...tasks];
          setTasks(updated);
          saveDevFallbackTasks(updated);
          return newTask;
        }

        const created = await taskService.createTask(taskData);
        setTasks((prev) => [created, ...prev]);
        return created;
      } catch (err) {
        // If backend connection fails mid-operation, gracefully use fallback
        if (err.status === 0) {
          setIsDemoMode(true);
          const newTask = {
            id: `dev-${Date.now()}`,
            ...taskData,
            completed: taskData.status === "completed",
            createdAt: new Date().toISOString(),
          };
          const updated = [newTask, ...tasks];
          setTasks(updated);
          saveDevFallbackTasks(updated);
          return newTask;
        }
        setError(err.message || "Failed to create task");
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [isDemoMode, tasks]
  );

  // Update Task
  const updateTask = useCallback(
    async (id, updatePayload) => {
      setSubmitting(true);
      setError(null);
      const previous = [...tasks];

      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatePayload } : t))
      );

      try {
        if (isDemoMode) {
          const updatedList = tasks.map((t) =>
            t.id === id ? { ...t, ...updatePayload } : t
          );
          setTasks(updatedList);
          saveDevFallbackTasks(updatedList);
          return updatedList.find((t) => t.id === id);
        }

        const updated = await taskService.updateTask(id, updatePayload);
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return updated;
      } catch (err) {
        // Rollback
        setTasks(previous);
        setError(err.message || "Failed to update task");
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [isDemoMode, tasks]
  );

  // Toggle Completion
  const toggleTask = useCallback(
    async (id, currentCompleted) => {
      const nextCompleted = !currentCompleted;
      const previous = [...tasks];

      // Optimistic toggle
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: nextCompleted,
                status: nextCompleted ? "completed" : "pending",
              }
            : t
        )
      );

      try {
        if (isDemoMode) {
          const updated = tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: nextCompleted,
                  status: nextCompleted ? "completed" : "pending",
                }
              : t
          );
          setTasks(updated);
          saveDevFallbackTasks(updated);
          return;
        }

        await taskService.toggleTaskStatus(id, nextCompleted);
      } catch (err) {
        // Revert on failure
        setTasks(previous);
        setError(err.message || "Failed to update status");
      }
    },
    [isDemoMode, tasks]
  );

  // Delete Task
  const deleteTask = useCallback(
    async (id) => {
      setSubmitting(true);
      const previous = [...tasks];

      // Optimistic removal
      setTasks((prev) => prev.filter((t) => t.id !== id));

      try {
        if (isDemoMode) {
          const updated = tasks.filter((t) => t.id !== id);
          setTasks(updated);
          saveDevFallbackTasks(updated);
          return;
        }

        await taskService.deleteTask(id);
      } catch (err) {
        // Rollback
        setTasks(previous);
        setError(err.message || "Failed to delete task");
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [isDemoMode, tasks]
  );

  // Derived filtered & sorted tasks for client-side smoothing
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((t) => {
        if (statusFilter === "completed") return t.completed;
        if (statusFilter === "pending") return !t.completed && t.status !== "in_progress";
        if (statusFilter === "in_progress") return t.status === "in_progress";
        return true;
      });
    }

    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "dueDate_asc") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      if (sortBy === "dueDate_desc") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return b.dueDate.localeCompare(a.dueDate);
      }
      if (sortBy === "createdAt_desc") {
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      }
      if (sortBy === "priority_desc") {
        const order = { high: 3, medium: 2, low: 1 };
        return (order[b.priority] || 0) - (order[a.priority] || 0);
      }
      return 0;
    });

    return result;
  }, [tasks, statusFilter, priorityFilter, searchQuery, sortBy]);

  return {
    tasks: processedTasks,
    allTasks: tasks,
    loading,
    error,
    isDemoMode,
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
    refetch: fetchTasks,
  };
}
