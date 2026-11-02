"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
  maxWidth = "max-w-6xl",
  noPadding = false,
}) {
  return (
    <div
      className={cn(
        "w-full mx-auto",
        maxWidth,
        !noPadding && "p-4 sm:p-6 lg:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
