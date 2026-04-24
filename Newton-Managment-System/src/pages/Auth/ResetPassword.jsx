import React, { useState } from "react";

import Header from "../../components/Auth/Header";
import AuthCard from "../../components/Auth/AuthCard";
import AuthButton from "../../components/Auth/AuthButton";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      setError("Fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Password reset successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 2200);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] to-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center p-6">
        <AuthCard
          title="Reset Password"
          subtitle="Create your new secure password"
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-16 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-400 outline-none text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-cyan-300 hover:text-cyan-200 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full p-3 pr-16 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-400 outline-none text-white"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-cyan-300 hover:text-cyan-200 transition"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-center">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-center">
                <p className="text-emerald-300 font-semibold">
                  Password Reset Successful
                </p>
                <p className="text-xs text-emerald-200/70 mt-1">
                  Redirecting to login...
                </p>
              </div>
            )}

            {/* BUTTON */}
            <AuthButton
              loading={isLoading}
              text="Reset Password"
            />

          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default ResetPassword;