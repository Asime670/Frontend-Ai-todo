/**
 * Local client-side storage for user-created tasks when
 * backend task endpoints are in development.
 * Starts completely EMPTY — no dummy or seeded tasks.
 * Tasks will ONLY appear when the user creates them.
 */

const STORAGE_KEY = "ai_todo_user_created_tasks";

export function getDevFallbackTasks() {
  if (typeof window === "undefined") return [];
  try {
    // Clean up any legacy dummy tasks storage if present
    localStorage.removeItem("ai_todo_dev_fallback_tasks");

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    // Filter out any leftover legacy demo items if they exist
    return Array.isArray(parsed)
      ? parsed.filter((t) => !String(t.id).startsWith("dev-") || t.createdAt)
      : [];
  } catch {
    return [];
  }
}

export function saveDevFallbackTasks(tasks) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
}

export function clearAllLocalTasks() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("ai_todo_dev_fallback_tasks");
  } catch {}
}
