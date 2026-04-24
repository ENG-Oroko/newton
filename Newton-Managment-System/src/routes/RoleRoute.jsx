import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ children, allowedRoles, redirectTo }) => {
  const { user, loading } = useAuth();

  // still checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  // not logged in → go login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // role not allowed → redirect safely
  if (!allowedRoles.includes(user.role)) {

    // smart fallback redirect based on role
    const fallbackRoutes = {
      client: "/dashboard/client",
      sales: "/dashboard/sales",
      staff: "/dashboard/staff",
      store_manager: "/dashboard/store-manager",
      admin: "/dashboard/admin",
      super_admin: "/dashboard/super-admin",
    };

    return <Navigate to={redirectTo || fallbackRoutes[user.role]} replace />;
  }

  return children;
};

export default RoleRoute;