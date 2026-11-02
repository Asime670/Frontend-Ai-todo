"use client";

import React, { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export function AppearanceSettings() {
  const [theme, setTheme] = useState("light");
  const [startOfWeek, setStartOfWeek] = useState("sunday");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#1E1E1E]">
          Appearance & Regional
        </h3>
        <p className="text-xs text-[#6B7280]">
          Configure visual tone, calendar start day, and timezone
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3 text-xs rounded border bg-[#EBF1EE] text-[#42665D] border-[#D1E0D9]">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Preferences saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Theme mode selection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#1F2937]">
            Color Theme
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`p-3 rounded-md border text-left text-xs transition-colors ${
                theme === "light"
                  ? "border-[#52796F] bg-[#EBF1EE]/40 text-[#1E1E1E] font-medium ring-1 ring-[#52796F]"
                  : "border-[#E2E8F0] bg-white text-[#6B7280] hover:bg-[#FAFAFA]"
              }`}
            >
              <div className="font-semibold text-xs text-[#1E1E1E]">Light (Default)</div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">
                Minimalist #FAFAFA canvas with sage green accents
              </div>
            </button>
            <button
              type="button"
              disabled
              className="p-3 rounded-md border border-[#E2E8F0] bg-[#F3F4F2] text-left text-xs opacity-60 cursor-not-allowed"
              title="Dark theme in development"
            >
              <div className="font-semibold text-xs text-[#6B7280]">Dark Theme</div>
              <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                Available in upcoming system update
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Start of the Week"
            value={startOfWeek}
            onChange={(e) => setStartOfWeek(e.target.value)}
            options={[
              { value: "sunday", label: "Sunday" },
              { value: "monday", label: "Monday" },
            ]}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#1F2937]">
              Timezone
            </label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 text-sm text-[#1F2937] bg-white border border-[#E2E8F0] rounded-md transition-colors focus:outline-none focus:border-[#52796F]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="sm">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
