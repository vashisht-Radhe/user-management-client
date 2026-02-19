import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

const UserRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
