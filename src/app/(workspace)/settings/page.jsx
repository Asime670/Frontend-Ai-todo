"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { User, Sliders, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile"); // profile, appearance, security

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance & Regional", icon: Sliders },
    { id: "security", label: "Security & Account", icon: Shield },
  ];

  return (
    <PageContainer className="space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">
          Settings
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Configure personal preferences, display options, and security credentials
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#F3F4F2] p-1 rounded-md self-start inline-flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-colors",
                isActive
                  ? "bg-white text-[#1E1E1E] shadow-sm"
                  : "text-[#6B7280] hover:text-[#1F2937]"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
        {activeTab === "security" && <NotificationSettings />}
      </div>
    </PageContainer>
  );
}
