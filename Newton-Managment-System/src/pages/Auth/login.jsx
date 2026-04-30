import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../../components/Auth/Header.jsx";
import AuthCard from "../../components/Auth/AuthCard.jsx";
import InputField from "../../components/Auth/InputField.jsx";
import PasswordField from "../../components/Auth/PasswordField.jsx";
import AuthButton from "../../components/Auth/AuthButton.jsx";

import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const redirectByRole = (role) => {
    switch (role) {
      case "student":
        return "/dashboard/student";

      case "lecturer":
        return "/dashboard/lecturer";

      case "finance":
        return "/dashboard/finance";

      case "registrator":
        return "/dashboard/registrar";

      case "college_admin":
        return "/dashboard/college-admin";

      case "super_admin":
        return "/dashboard/director";

      default:
        return "/";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      const result = await login(email, password);

      if (!result) {
        setError("Invalid email or password");
        return;
      }

      navigate(redirectByRole(result.role));
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b18] to-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 items-center justify-center p-6">
        <AuthCard
          title="Welcome Back"
          subtitle="Sign in to access your school dashboard"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <InputField
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <PasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-center">
                {error}
              </div>
            )}

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-cyan-300 hover:text-cyan-200 transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <AuthButton loading={isLoading} text="Sign In" />
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default Login;