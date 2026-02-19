import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const user = await userService.getProfile();
      setUser(user);
    } catch (err) {
      // console.error("PROFILE FAILED:", err.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const login = async (data) => {
    try {
      const res = await authService.login(data);
      setUser(res.data.data);
      return { user: res.data.data };
    } catch (err) {
      return {
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await authService.register(data);
      setUser(res.data?.data);
      return res;
    } catch (error) {
      console.error(error);
      return {
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {}
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      getProfile,
      loading,
      registerUser,
      login,
      logout,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
