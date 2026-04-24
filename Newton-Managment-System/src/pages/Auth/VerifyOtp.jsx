import React, { useState } from "react";

import Header from "../../components/Auth/Header";
import AuthCard from "../../components/Auth/AuthCard";
import AuthButton from "../../components/Auth/AuthButton";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (value) => {
    // Only numbers allowed
    if (!/^\d*$/.test(value)) return;

    setOtp(value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Nice success response
      setSuccess("OTP verified successfully. Redirecting...");

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/reset-password";
      }, 1800);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] to-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center p-6">
        <AuthCard
          title="Verify OTP"
          subtitle="Enter the 6-digit code sent to your email"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP INPUT */}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full p-4 text-center text-xl tracking-[0.4em] bg-white/10 border border-white/10 rounded-xl text-white focus:border-cyan-400 outline-none"
            />

            {/* ERROR MESSAGE */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-center">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-3 text-center animate-pulse">
                <div className="text-1xl mb-1">✓</div>
                <p className="text-emerald-300 font-semibold">
                  OTP Verified Successfully
                </p>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Redirecting to reset password...
                </p>
              </div>
            )}

            {/* BUTTON */}
            <AuthButton
              loading={isLoading}
              text="Verify OTP"
            />
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default VerifyOtp;