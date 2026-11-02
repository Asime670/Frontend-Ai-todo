import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <span className="text-4xl font-bold text-[#52796F]">404</span>
        <h1 className="text-xl font-bold text-[#1E1E1E]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          The page you requested does not exist or may have been relocated.
        </p>
        <div className="pt-2">
          <Link href="/dashboard">
            <Button variant="primary" size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Workspace</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
