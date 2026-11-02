import { api } from "@/lib/api";

export const userService = {
  /**
   * Fetch current user profile
   */
  async getProfile() {
    try {
      const data = await api.get("/user/profile");
      return data?.user || data;
    } catch (err) {
      if (err.status === 404) {
        const data = await api.get("/users/me");
        return data?.user || data;
      }
      throw err;
    }
  },

  /**
   * Update profile details (e.g. displayName, email)
   */
  async updateProfile(profileData) {
    try {
      const data = await api.patch("/user/profile", profileData);
      return data?.user || data;
    } catch (err) {
      if (err.status === 405 || err.status === 404) {
        const data = await api.put("/user/profile", profileData);
        return data?.user || data;
      }
      throw err;
    }
  },

  /**
   * Update preferences (timezone, week start, theme)
   */
  async updatePreferences(preferences) {
    try {
      const data = await api.patch("/user/preferences", preferences);
      return data?.preferences || data;
    } catch (err) {
      if (err.status === 404) {
        // Fallback: update on general user endpoint if preferences sub-route doesn't exist
        const data = await api.patch("/user/profile", { preferences });
        return data?.preferences || preferences;
      }
      throw err;
    }
  },

  /**
   * Change password if supported by backend
   */
  async changePassword(currentPassword, newPassword) {
    return await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  },
};
