import React from "react";
import Link from "next/link";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";
import { CheckSquare } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-xs border-b border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-[#52796F] text-white">
              <CheckSquare className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-semibold text-base tracking-tight text-[#1E1E1E]">
              Minimalist
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
