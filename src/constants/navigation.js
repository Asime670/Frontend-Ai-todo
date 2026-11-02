import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Flame,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    name: "Streaks",
    href: "/streaks",
    icon: Flame,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
