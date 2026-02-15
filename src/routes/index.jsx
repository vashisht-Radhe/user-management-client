import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import AdminLayout from "../components/layout/AdminLayout";
import UserLayout from "../components/layout/UserLayout";

import ActivityPage from "../pages/admin/ActivityPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOtp from "../pages/auth/VerifiyOtp";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/user/Profile";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";
import UserRoute from "./UserRoute";
import ChangePassword from "../pages/user/ChangePassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<UserRoute />}>
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="activity" element={<ActivityPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
