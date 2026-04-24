import React, { useState } from "react";

import Header from "../../components/Auth/Header";
import AuthCard from "../../components/Auth/AuthCard";
import InputField from "../../components/Auth/InputField";
import AuthButton from "../../components/Auth/AuthButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);

    // simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // 🔥 REDIRECT TO OTP PAGE
      window.location.href = "/verify-otp";

    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] to-black text-white flex flex-col">

      <Header />

      <div className="flex flex-1 items-center justify-center p-6">

        <AuthCard
          title="Forgot Password"
          subtitle="Enter your email to receive OTP"
        >

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL INPUT */}
            <InputField
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* BUTTON */}
            <AuthButton
              loading={isLoading}
              text="Send OTP"
            />

          </form>

        </AuthCard>

      </div>
    </div>
  );
};

export default ForgotPassword;