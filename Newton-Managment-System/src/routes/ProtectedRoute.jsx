import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // still checking localStorage
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  // NOT logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // logged in → allow access
  return children;
};

export default ProtectedRoute;