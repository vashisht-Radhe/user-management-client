import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  console.log("Admin user", user);
  console.log("Admin loading", loading);
  
  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
