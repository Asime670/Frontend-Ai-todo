import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#52796F]" />
        <p className="text-xs font-medium text-[#6B7280]">Loading workspace...</p>
      </div>
    </div>
  );
}
