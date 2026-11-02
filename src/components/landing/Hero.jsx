"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckSquare, ArrowRight, Calendar, Check, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Understated Category Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF1EE] border border-[#D1E0D9] text-xs font-medium text-[#42665D] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52796F]" />
          Minimalist Productivity Workspace
        </div>

        {/* Clear Hero Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1E1E] leading-[1.15]">
          Organize daily work without the noise.
        </h1>

        {/* Supporting Paragraph */}
        <p className="mt-5 text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          A calm, focused task management system designed for steady execution.
          Capture daily priorities, remember critical deadlines, and build consistent habits with quiet clarity.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Log In
            </Button>
          </Link>
        </div>

        {/* Realistic Interface Preview */}
        <div className="mt-14 max-w-3xl mx-auto text-left bg-white border border-[#E2E8F0] rounded-lg shadow-xs overflow-hidden">
          {/* Mock Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] bg-[#FAFAFA]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            </div>
            <span className="text-xs text-[#6B7280] font-medium">
              Daily Workspace Overview
            </span>
            <span className="text-[11px] text-[#52796F] font-semibold bg-[#EBF1EE] px-2 py-0.5 rounded">
              Today
            </span>
          </div>

          {/* Mock Task Rows */}
          <div className="p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-[#52796F] flex items-center justify-center text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium line-through text-[#9CA3AF]">
                    Review design tokens and border contrast guidelines
                  </p>
                  <p className="text-[11px] text-[#9CA3AF]">Completed at 09:15 AM</p>
                </div>
              </div>
              <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">
                Design
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-[#CBD5E1] bg-white" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#1E1E1E]">
                    Ship production frontend architecture with clean API layer
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[#42665D] font-medium">
                      <Clock className="w-3 h-3" /> Today, 02:00 PM
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-medium">
                High Priority
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-[#CBD5E1] bg-white" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#1E1E1E]">
                    Prepare milestone retrospectives and weekly consistency log
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Tomorrow
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 font-medium">
                Medium
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
