"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { userService } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

export function NotificationSettings() {
  const { logout } = useAuth();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await userService.changePassword(currentPassword, newPassword);
      setStatus({ type: "success", message: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Unable to update password. Verify current password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#52796F]" />
          <div>
            <h3 className="text-sm font-semibold text-[#1E1E1E]">Security & Password</h3>
            <p className="text-xs text-[#6B7280]">
              Update your account credentials
            </p>
          </div>
        </div>

        {status && (
          <div
            className={`flex items-start gap-2 p-3 text-xs rounded border ${
              status.type === "success"
                ? "bg-[#EBF1EE] text-[#42665D] border-[#D1E0D9]"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <Input
            type="password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="pt-2">
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              loading={loading}
              disabled={loading}
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>

      {/* Session Management Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 sm:p-6 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-[#1E1E1E]">Session Logout</h4>
          <p className="text-xs text-[#6B7280] mt-0.5">
            End your current workspace session on this device
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="text-rose-700 hover:bg-rose-50 border-rose-200 gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
