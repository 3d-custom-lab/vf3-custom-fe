import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { verifyEmail, sendVerificationEmail } from "../../services/authService";

export default function OTPModal({ email, onClose, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Focus vào ô input đầu tiên khi component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Chỉ cho phép nhập số
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null); // Clear error khi user nhập

    // Auto focus sang ô tiếp theo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý phím Backspace để focus về ô trước
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Xử lý dán mã OTP từ clipboard
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    // Kiểm tra paste data chỉ chứa số
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus vào ô trống đầu tiên hoặc ô cuối
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  //   Xử lý xác thực OTP
  const handleVerify = async () => {
    const otpCode = otp.join("");

    // Kiểm tra OTP đã đủ 6 số chưa
    if (otpCode.length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 số OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await verifyEmail(email, otpCode);

      if (response.code === 1000 && response.result) {
        // Xác thực thành công
        onVerified();
      } else {
        setError(
          response.message || "Mã OTP không chính xác. Vui lòng thử lại."
        );
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Mã OTP không chính xác. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   Xử lý gửi lại mã OTP
  const handleResend = async () => {
    setResendLoading(true);
    setError(null);
    setResendSuccess(false);

    try {
      const response = await sendVerificationEmail(email);

      if (response.code === 1000) {
        setResendSuccess(true);
        setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
        inputRefs.current[0]?.focus(); // Focus lại ô đầu tiên

        // Hide success message sau 3s
        setTimeout(() => {
          setResendSuccess(false);
        }, 3000);
      } else {
        setError(
          response.message || "Không thể gửi lại mã. Vui lòng thử lại sau."
        );
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setError("Không thể gửi lại mã. Vui lòng thử lại sau.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl shadow-blue-500/20 max-w-md w-full p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <MdClose className="text-2xl" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Verify Your Email
            </h3>
            <p className="text-gray-400 text-sm">
              Please enter the 6-digit OTP we sent to
            </p>
            <p className="text-blue-400 font-semibold mt-1">{email}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {resendSuccess && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/50 rounded-xl">
              <p className="text-green-400 text-sm text-center">
                Mã OTP mới đã được gửi đến email của bạn!
              </p>
            </div>
          )}

          {/* OTP Input Fields */}
          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={loading}
                className="w-12 h-14 text-center text-2xl font-bold bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.some((digit) => !digit) || loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-400 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {/* Resend Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Didn't receive code?{" "}
              <span className="font-semibold">
                {resendLoading ? "Sending..." : "Resend"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
