export const TASK_PRIORITIES = [
  {
    value: "low",
    label: "Low",
    badgeClasses: "bg-stone-100 text-stone-700 border-stone-200",
    dotClass: "bg-stone-400",
  },
  {
    value: "medium",
    label: "Medium",
    badgeClasses: "bg-amber-50 text-amber-800 border-amber-200",
    dotClass: "bg-amber-500",
  },
  {
    value: "high",
    label: "High",
    badgeClasses: "bg-rose-50 text-rose-800 border-rose-200",
    dotClass: "bg-rose-500",
  },
];

export const TASK_STATUSES = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export const SORT_OPTIONS = [
  { value: "dueDate_asc", label: "Due Date (Earliest first)" },
  { value: "dueDate_desc", label: "Due Date (Latest first)" },
  { value: "createdAt_desc", label: "Recently Added" },
  { value: "priority_desc", label: "Priority (High to Low)" },
];
