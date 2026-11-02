"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header({ onQuickAdd }) {
  const pathname = usePathname();

  const currentNav = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname?.startsWith(`${item.href}/`)
  );

  const title = currentNav?.name || "Workspace";

  return (
    <header className="hidden md:flex items-center justify-between px-8 h-16 border-b border-[#E2E8F0] bg-white shrink-0">
      <div>
        <h1 className="text-base font-semibold text-[#1E1E1E]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search Link to /tasks */}
        <Link
          href="/tasks"
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#6B7280] bg-[#F3F4F2] border border-[#E2E8F0] rounded-md hover:text-[#1F2937] hover:border-[#CBD5E1] transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick search...</span>
          <kbd className="hidden lg:inline-block text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0] text-[#9CA3AF]">
            /
          </kbd>
        </Link>

        {/* Optional Notification bell - understated */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F2] rounded-md border border-transparent hover:border-[#E2E8F0] transition-colors"
          title="No unread alerts"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Quick Add Task button if handler passed */}
        {onQuickAdd && (
          <Button
            size="sm"
            onClick={onQuickAdd}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Task</span>
          </Button>
        )}
      </div>
    </header>
  );
}
