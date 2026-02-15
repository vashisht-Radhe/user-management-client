import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await userService.getProfile();
      setUser(res.data.data);
    } catch {
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
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, getProfile, loading, registerUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
