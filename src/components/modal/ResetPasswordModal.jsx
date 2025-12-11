import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { resetPassword, forgetPassword } from "../../services/authService";
import useToast from "../../hooks/useToast";

export default function ResetPasswordModal({
  isOpen,
  onClose,
  email,
  onSuccess,
}) {
  const { showSuccess, showError } = useToast();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 120);
    }
  }, [isOpen]);

  const handleOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const newOtp = [...otp];
    newOtp[i] = v;
    setOtp(newOtp);
    setError("");
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;
    const newOtp = [...otp];
    data.split("").forEach((c, i) => (newOtp[i] = c));
    setOtp(newOtp);
    const next = newOtp.findIndex((x) => !x);
    inputRefs.current[next !== -1 ? next : 5]?.focus();
  };

  const validateForm = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6)
      return setError("Please enter the 6-digit code"), false;
    if (!newPassword.trim())
      return setError("Please enter a new password"), false;
    if (newPassword.length < 6)
      return setError("Password must be at least 6 characters"), false;
    if (newPassword !== confirmPassword)
      return setError("Passwords do not match"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await resetPassword(email, otp.join(""), newPassword);
      if (res.code === 0 || res.code === 1000) {
        showSuccess("Password reset successfully!");
        onSuccess();
        handleClose();
      } else setError(res.message || "Failed to reset password");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    try {
      const res = await forgetPassword(email);
      if (res.code === 0 || res.code === 1000) {
        showSuccess("A new verification code has been sent!");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else setError(res.message || "Failed to resend code");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend code.";
      setError(msg);
      showError(msg);
    } finally {
      setResendLoading(false);
    }
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl shadow-blue-500/20 max-w-md w-full"
            >
              <div className="relative p-6 border-b border-gray-700 flex items-center gap-3">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition disabled:opacity-50 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 shadow-blue-500/30 shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Reset Password
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Verify code & set new password
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">
                    We sent a verification code to:
                  </p>
                  <p className="text-blue-400 font-semibold break-all">
                    {email}
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-center"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* OTP */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Verification Code
                  </label>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        maxLength={1}
                        value={digit}
                        type="text"
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        disabled={loading}
                        className="w-12 h-14 rounded-xl bg-gray-900/50 border-2 border-gray-700 text-white text-2xl font-bold text-center transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="text-sm text-gray-400 hover:text-blue-400 transition disabled:opacity-50 cursor-pointer"
                  >
                    {resendLoading
                      ? "Sending..."
                      : "Didn't receive code? Resend"}
                  </button>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter new password"
                      disabled={loading}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="cursor-pointer" />
                      ) : (
                        <Eye size={18} className="cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Confirm new password"
                      disabled={loading}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    className="flex-1 py-3.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-xl font-semibold transition disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl font-semibold transition transform hover:scale-[1.02] hover:bg-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
