"use client";

import React from "react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Capture and prioritize",
      description:
        "Quickly log commitments with clean priority labels and optional tags to keep work organized.",
    },
    {
      step: "02",
      title: "Schedule on your terms",
      description:
        "Assign due dates and examine your upcoming workload across intuitive monthly and weekly timelines.",
    },
    {
      step: "03",
      title: "Execute and maintain consistency",
      description:
        "Check off tasks daily, maintain an unbroken momentum streak, and review verifiable completion metrics.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-[#E2E8F0] bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
            How it works
          </h2>
          <p className="text-sm text-[#6B7280] mt-2">
            A frictionless workflow designed around human attention and daily habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-6 bg-white border border-[#E2E8F0] rounded-lg space-y-3 relative"
            >
              <span className="text-xs font-mono font-bold text-[#52796F] bg-[#EBF1EE] px-2 py-0.5 rounded">
                {item.step}
              </span>
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
