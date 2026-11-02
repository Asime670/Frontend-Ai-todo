"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-suggest username if name is typed and username is empty
      if (name === "name" && !prev.username) {
        next.username = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
      }
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const newErrors = {};
    const finalUsername = (formData.username || formData.name).trim().replace(/\s+/g, "_");

    if (!finalUsername) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({
        username: finalUsername,
        name: formData.name.trim() || finalUsername,
        email: formData.email.trim(),
        password: formData.password,
      });
      router.push("/dashboard");
    } catch (err) {
      if (err.status === 0 || err.status === 404) {
        setServerError(
          "Backend authentication endpoint is initializing at " +
            (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") +
            ". You may continue to the workspace preview."
        );
      } else {
        setServerError(err.message || "Failed to create account.");
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
          Create your account
        </h2>
        <p className="text-xs text-[#6B7280] mt-1">
          Start planning with calm, human-designed clarity
        </p>
      </div>

      {serverError && (
        <div className="flex items-start gap-2.5 p-3 text-xs rounded-md bg-rose-50 border border-rose-200 text-rose-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <div className="flex-1">
            <span>{serverError}</span>
            {serverError.includes("endpoint is initializing") && (
              <button
                type="button"
                onClick={handlePreviewEnter}
                className="block mt-1 font-semibold underline text-[#42665D]"
              >
                Enter Workspace &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            name="name"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isSubmitting}
          />
          <Input
            label="Username *"
            name="username"
            placeholder="janedoe"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            disabled={isSubmitting}
          />
        </div>

        <Input
          type="email"
          label="Email Address *"
          name="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
        />

        <Input
          type="password"
          label="Password *"
          name="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isSubmitting}
        />

        <Input
          type="password"
          label="Confirm Password *"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-[#E2E8F0]">
        <p className="text-xs text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#52796F] hover:text-[#42665D] underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
