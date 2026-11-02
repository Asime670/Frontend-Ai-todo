"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-[#E2E8F0]/60",
        className
      )}
      {...props}
    />
  );
}
