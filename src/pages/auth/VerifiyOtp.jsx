import { useState } from "react";
import { verifyOtp, resendOtp } from "../../services/auth.service";
import Timer from "../../utilis/Timer";
import { Button, Input } from "../../components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VerifyOtp = () => {
  const { getProfile } = useAuth();
  const [otp, setOtp] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp(otp.trim());
      toast.success(res.data.message);

      await getProfile();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await resendOtp();
      toast.success(res.data?.message || "OTP resent successfully");
      setIsTimerActive(true);
      setTimerKey((prev) => prev + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="auth-title">Verify OTP</h1>
          <p className="auth-subtitle">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center tracking-widest text-lg"
            inputMode="numeric"
            autoComplete="one-time-code"
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* Resend */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p className="mb-2">Didn't receive the code?</p>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={isTimerActive}
              onClick={handleResendOtp}
              className={`font-medium transition ${
                isTimerActive ? "text-gray-400 cursor-not-allowed" : "auth-link"
              }`}
            >
              Resend OTP
            </button>

            {isTimerActive && (
              <Timer
                key={timerKey}
                initialSeconds={60}
                onComplete={() => setIsTimerActive(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
