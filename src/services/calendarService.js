import { api } from "@/lib/api";
import { taskService } from "./taskService";
import { toDateString } from "@/lib/date-utils";

export const calendarService = {
  /**
   * Fetch calendar tasks.
   * Attempts dedicated /calendar endpoint first; if unavailable,
   * cleanly derives tasks by due date using taskService.
   */
  async getCalendarEvents(startDate, endDate) {
    try {
      const data = await api.get(`/calendar?start=${startDate}&end=${endDate}`);
      return Array.isArray(data) ? data : data?.events || data?.tasks || [];
    } catch (err) {
      // If no dedicated calendar endpoint, gracefully derive from standard taskService
      if (err.status === 404 || err.status === 0) {
        const { tasks } = await taskService.getTasks();
        return tasks.filter((t) => {
          if (!t.dueDate) return false;
          const ds = toDateString(t.dueDate);
          return (!startDate || ds >= startDate) && (!endDate || ds <= endDate);
        });
      }
      throw err;
    }
  },
};
