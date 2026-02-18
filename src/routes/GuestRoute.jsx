import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const GuestRoute = () => {
  const { user, loading } = useAuth();
  console.log("Guest", user);
  console.log("Guest loading", loading);

  if (loading) return <Spinner />;

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
