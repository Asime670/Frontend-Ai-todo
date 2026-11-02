import { api } from "@/lib/api";

export const streakService = {
  /**
   * Fetches streak and activity history from backend endpoint /streaks.
   * If endpoint is not yet provided by backend, returns status: 'unsupported'
   * so UI can render a clear, honest notice without fabricating historical data.
   */
  async getStreakData() {
    try {
      const data = await api.get("/streaks");
      return {
        isSupported: true,
        currentStreak: data?.currentStreak ?? 0,
        longestStreak: data?.longestStreak ?? 0,
        completedToday: data?.completedToday ?? 0,
        activityHistory: data?.activityHistory || [], // Array of { date: 'YYYY-MM-DD', count: N }
      };
    } catch (err) {
      if (err.status === 404 || err.status === 0) {
        return {
          isSupported: false,
          currentStreak: 0,
          longestStreak: 0,
          completedToday: 0,
          activityHistory: [],
          message:
            "Backend streak endpoint (/streaks) is pending implementation. Historical completion tracking will activate once connected.",
        };
      }
      throw err;
    }
  },
};
