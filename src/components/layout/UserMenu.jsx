"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, LogOut, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/login");
  };

  const displayName = user?.name || user?.displayName || user?.email?.split("@")[0] || "Workspace Member";
  const email = user?.email || "user@workspace.local";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative w-full" ref={menuRef}>
      {/* User Bar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2.5 w-full p-2 text-left rounded-md transition-colors",
          "hover:bg-[#F3F4F2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#52796F]",
          isOpen && "bg-[#F3F4F2]"
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EBF1EE] text-[#42665D] font-medium text-xs shrink-0 border border-[#D1E0D9]">
          {initials || <User className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#1E1E1E] truncate">
            {displayName}
          </p>
          <p className="text-[11px] text-[#6B7280] truncate">{email}</p>
        </div>
        <ChevronUp
          className={cn(
            "w-3.5 h-3.5 text-[#9CA3AF] transition-transform duration-150",
            isOpen ? "rotate-0" : "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1.5 w-full bg-white border border-[#E2E8F0] rounded-md shadow-sm py-1 z-30">
          <div className="px-3 py-2 border-b border-[#E2E8F0] mb-1">
            <p className="text-xs font-semibold text-[#1E1E1E]">{displayName}</p>
            <p className="text-[11px] text-[#6B7280] truncate">{email}</p>
          </div>
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#1F2937] hover:bg-[#F3F4F2] transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-[#6B7280]" />
            Preferences
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
