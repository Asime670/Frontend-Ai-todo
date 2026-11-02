"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { UserMenu } from "./UserMenu";
import { cn } from "@/lib/utils";
import { Menu, X, CheckSquare } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Top Header Toggle */}
      <div className="flex md:hidden items-center justify-between px-4 h-14 bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-[#52796F] text-white">
            <CheckSquare className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#1E1E1E]">
            Minimalist
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-[#1F2937] hover:bg-[#F3F4F2] rounded-md transition-colors"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-[1px] z-50 md:hidden transition-opacity"
        />
      )}

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 w-72 bg-white border-r border-[#E2E8F0] z-50 flex flex-col transition-transform duration-200 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-[#52796F] text-white">
              <CheckSquare className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#1E1E1E]">
              Minimalist
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 text-[#6B7280] hover:text-[#1F2937] rounded-md"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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

        <div className="p-3 border-t border-[#E2E8F0] bg-white">
          <UserMenu />
        </div>
      </div>
    </>
  );
}
