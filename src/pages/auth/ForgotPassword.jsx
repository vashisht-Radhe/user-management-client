import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Input } from "../../components";
import { forgotPassword } from "../../services/auth.service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      toast.success("If this email exists, a reset link has been sent");
    } catch (err) {
      console.log("error", err.message);
      toast.success("If this email exists, a reset link has been sent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your email to receive a reset link
        </p>

        <div className="mt-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>   

        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
