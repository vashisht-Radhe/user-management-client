import { useState } from "react";
import { verifyOtp, resendOtp } from "../../services/auth.service";
import Timer from "../../utilis/Timer";
import { Button, Input } from "../../components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp(otp);
      toast.success(res.data.message);
      navigate("/dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Verify OTP</h2>
          <p className="text-sm text-gray-500 mt-1">
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
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* Resend */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p className="mb-2">Didn’t receive the code?</p>

          <div className="flex items-center justify-center gap-2">
            <button
              disabled={isTimerActive}
              onClick={handleResendOtp}
              className={`font-medium transition ${
                isTimerActive
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-indigo-600 hover:underline"
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
