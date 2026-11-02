"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await login(identifier.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      if (err.status === 0 || err.status === 404) {
        setServerError(
          "Backend server not responding at " +
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") +
          ". You may continue into local preview mode."
        );
      } else {
        setServerError(err.message || "Invalid credentials. Please verify your username/email and password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviewEnter = () => {
    router.push("/dashboard");
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-[#1E1E1E]">
          Welcome back
        </h2>
        <p className="text-xs text-[#6B7280] mt-1">
          Enter your credentials to access your workspace
        </p>
      </div>

      {serverError && (
        <div className="flex items-start gap-2.5 p-3 text-xs rounded-md bg-rose-50 border border-rose-200 text-rose-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <div className="flex-1">
            <span>{serverError}</span>
            {serverError.includes("Backend server not responding") && (
              <button
                type="button"
                onClick={handlePreviewEnter}
                className="block mt-1 font-semibold underline text-[#42665D]"
              >
                Enter Preview Workspace &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Email or Username"
          id="login-identifier"
          name="identifier"
          autoComplete="username"
          placeholder="username or name@example.com"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: null }));
          }}
          error={errors.identifier}
          disabled={isSubmitting}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            id="login-password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
            }}
            error={errors.password}
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[31px] text-[#9CA3AF] hover:text-[#1F2937]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-[#E2E8F0]">
        <p className="text-xs text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#52796F] hover:text-[#42665D] underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
