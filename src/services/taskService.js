import { api } from "@/lib/api";

/**
 * Normalizes task object received from backend to standard frontend format
 */
export function normalizeTask(raw) {
  if (!raw) return null;
  return {
    id: raw.id || raw._id || String(raw.taskId || Date.now()),
    title: raw.title || raw.name || "Untitled Task",
    description: raw.description || raw.desc || "",
    dueDate: raw.dueDate || raw.due_date || raw.date || null,
    dueTime: raw.dueTime || raw.due_time || raw.time || null,
    priority: (raw.priority || "medium").toLowerCase(),
    status: (raw.status || (raw.completed ? "completed" : "pending")).toLowerCase(),
    completed: raw.status === "completed" || Boolean(raw.completed),
    category: raw.category || raw.label || raw.tag || null,
    createdAt: raw.createdAt || raw.created_at || null,
    updatedAt: raw.updatedAt || raw.updated_at || null,
    raw,
  };
}

export const taskService = {
  /**
   * Fetch all tasks with optional query params (status, priority, search, page, limit)
   */
  async getTasks(params = {}) {
    const query = new URLSearchParams();
    if (params.status && params.status !== "all") query.set("status", params.status);
    if (params.priority && params.priority !== "all") query.set("priority", params.priority);
    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", params.page);
    if (params.limit) query.set("limit", params.limit);

    const qs = query.toString();
    const endpoint = `/tasks${qs ? `?${qs}` : ""}`;
    const data = await api.get(endpoint);

    // Support array or paginated response { tasks: [...], total, page } or { data: [...] }
    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.tasks)
      ? data.tasks
      : Array.isArray(data?.data)
      ? data.data
      : [];

    return {
      tasks: items.map(normalizeTask),
      total: data?.total || data?.count || items.length,
      page: data?.page || 1,
      totalPages: data?.totalPages || data?.pages || 1,
    };
  },

  /**
   * Fetch a single task by ID
   */
  async getTaskById(id) {
    const data = await api.get(`/tasks/${id}`);
    const task = data?.task || data?.data || data;
    return normalizeTask(task);
  },

  /**
   * Create a new task
   */
  async createTask(payload) {
    const body = {
      title: payload.title.trim(),
      ...(payload.description?.trim() ? { description: payload.description.trim() } : {}),
      ...(payload.dueDate ? { due_date: payload.dueDate } : {}),
      ...(payload.dueTime ? { due_time: payload.dueTime } : {}),
      ...(payload.priority ? { priority: payload.priority } : { priority: "medium" }),
      status: payload.status || "pending",
      ...(payload.category?.trim() ? { category: payload.category.trim() } : {}),
    };

    const data = await api.post("/tasks", body);
    const created = data?.task || data?.data || data;
    return normalizeTask(created);
  },

  /**
   * Update an existing task
   */
  async updateTask(id, payload) {
    const body = {};
    if (payload.title !== undefined) body.title = payload.title.trim();
    if (payload.description !== undefined) body.description = payload.description.trim();
    if (payload.dueDate !== undefined) body.due_date = payload.dueDate;
    if (payload.dueTime !== undefined) body.due_time = payload.dueTime;
    if (payload.priority !== undefined) body.priority = payload.priority;
    if (payload.status !== undefined) body.status = payload.status;
    if (payload.category !== undefined) body.category = payload.category;

    let data;
    try {
      data = await api.patch(`/tasks/${id}`, body);
    } catch (err) {
      if (err.status === 405 || err.status === 404) {
        data = await api.put(`/tasks/${id}`, body);
      } else {
        throw err;
      }
    }
    const updated = data?.task || data?.data || data;
    return normalizeTask(updated);
  },

  /**
   * Toggle task completion status
   */
  async toggleTaskStatus(id, isCompleted) {
    const newStatus = isCompleted ? "completed" : "pending";
    try {
      return await this.updateTask(id, {
        status: newStatus,
        completed: isCompleted,
      });
    } catch {
      // Some backends use dedicated /tasks/:id/complete or /tasks/:id/toggle
      try {
        const data = await api.post(`/tasks/${id}/toggle`, { completed: isCompleted });
        return normalizeTask(data?.task || data);
      } catch (err) {
        throw err;
      }
    }
  },

  /**
   * Delete a task
   */
  async deleteTask(id) {
    return await api.delete(`/tasks/${id}`);
  },
};
