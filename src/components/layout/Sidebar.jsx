"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";
import { CheckSquare } from "lucide-react";

export function Sidebar({ className }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 border-r border-[#E2E8F0] bg-white h-screen sticky top-0 shrink-0",
        className
      )}
    >
      {/* App Wordmark */}
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-center w-7 h-7 rounded bg-[#52796F] text-white">
          <CheckSquare className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight text-[#1E1E1E]">
            Minimalist
          </span>
          <span className="text-[10px] text-[#6B7280] -mt-0.5 font-medium">
            Task Workspace
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">
            Workspace
          </span>
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-[#EBF1EE] text-[#42665D]"
                  : "text-[#1F2937] hover:bg-[#F3F4F2] hover:text-[#1E1E1E]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 stroke-[2]",
                  isActive ? "text-[#52796F]" : "text-[#6B7280]"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User profile bottom section */}
      <div className="p-3 border-t border-[#E2E8F0] bg-white">
        <UserMenu />
      </div>
    </aside>
  );
}
