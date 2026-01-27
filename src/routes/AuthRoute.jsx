import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return user.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  return <Outlet />;
};

export default AuthRoute;
