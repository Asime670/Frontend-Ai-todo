/**
 * Date utility helpers crafted for timezone-safe calendar and task calculations
 */

export function toDateString(date) {
  if (!date) return "";
  if (typeof date === "string") {
    // If it's already an ISO or YYYY-MM-DD string, take just the date part
    const match = date.match(/^\d{4}-\d{2}-\d{2}/);
    if (match) return match[0];
  }
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDate(dateStr) {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export function getTodayString() {
  return toDateString(new Date());
}

export function isSameDay(date1Str, date2Str) {
  return toDateString(date1Str) === toDateString(date2Str);
}

export function isDateToday(dateStr) {
  if (!dateStr) return false;
  return toDateString(dateStr) === getTodayString();
}

export function isDateOverdue(dateStr, isCompleted = false) {
  if (!dateStr || isCompleted) return false;
  const target = toDateString(dateStr);
  const today = getTodayString();
  return target < today;
}

export function isDateUpcoming(dateStr) {
  if (!dateStr) return false;
  const target = toDateString(dateStr);
  const today = getTodayString();
  return target > today;
}

export function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const normalized = toDateString(dateStr);
  const today = getTodayString();

  const todayDate = parseDate(today);
  const targetDate = parseDate(normalized);
  if (!targetDate || !todayDate) return dateStr;

  const diffTime = targetDate.getTime() - todayDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: targetDate.getFullYear() !== todayDate.getFullYear() ? "numeric" : undefined,
  });
}

export function formatMonthYear(year, monthIndex) {
  const d = new Date(year, monthIndex, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function getCalendarGrid(year, monthIndex) {
  // monthIndex: 0-11
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

  // Sunday = 0, Monday = 1, etc.
  const startDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];

  // Previous month trailing days
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const dateObj = new Date(year, monthIndex - 1, day);
    days.push({
      dateString: toDateString(dateObj),
      dayNumber: day,
      isCurrentMonth: false,
      date: dateObj,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, monthIndex, day);
    days.push({
      dateString: toDateString(dateObj),
      dayNumber: day,
      isCurrentMonth: true,
      date: dateObj,
    });
  }

  // Next month leading days to complete full grid (multiples of 7)
  const remaining = (7 - (days.length % 7)) % 7;
  for (let day = 1; day <= remaining; day++) {
    const dateObj = new Date(year, monthIndex + 1, day);
    days.push({
      dateString: toDateString(dateObj),
      dayNumber: day,
      isCurrentMonth: false,
      date: dateObj,
    });
  }

  return days;
}

export function getWeekDays(referenceDate = new Date()) {
  const d = new Date(referenceDate);
  const day = d.getDay();
  const diff = d.getDate() - day; // Adjust to Sunday or Monday
  const sunday = new Date(d.setDate(diff));

  const week = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(sunday);
    current.setDate(sunday.getDate() + i);
    week.push({
      dateString: toDateString(current),
      dayNumber: current.getDate(),
      dayName: current.toLocaleDateString("en-US", { weekday: "short" }),
      date: current,
    });
  }
  return week;
}
