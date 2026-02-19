import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Input, Button } from "../../components";
import { resetPassword } from "../../services/auth.service";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Invalid reset link");
    if (password.trim() !== confirm.trim())
      return toast.error("Passwords do not match");

    try {
      setLoading(true);
      await resetPassword(token, password);
      toast.success("Password reset successful");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <form onSubmit={onSubmit} className="auth-card">
        <h2 className="auth-title">Reset Password</h2>

        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        <p className="text-sm text-center mt-4">
          <Link to="/login" className="auth-link">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
