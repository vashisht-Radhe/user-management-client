import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (user) {
    const redirectPath =
      user.role === "admin" ? "/admin/dashboard" : "/dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
