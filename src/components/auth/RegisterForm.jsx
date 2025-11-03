import { useState } from "react";
import { MdEmail, MdPerson } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import OTPModal from "./OTPModal";
import { register } from "../../services/authService";

export default function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "MALE",
  });

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Đăng ký tài khoản (API register đã tự động gửi OTP)
      const registerResponse = await register(formData);

      if (registerResponse.code === 1000 && registerResponse.result) {
        setSuccess(
          "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
        );
        // Hiển thị modal OTP ngay sau khi đăng ký thành công
        setShowOTPModal(true);
      } else {
        setError(
          registerResponse.message || "Đăng ký thất bại. Vui lòng thử lại."
        );
      }
    } catch (err) {
      console.error("Register Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Đăng ký thất bại. Email có thể đã tồn tại.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi OTP được xác thực thành công
  const handleOTPVerified = () => {
    setShowOTPModal(false);
    setSuccess("Xác thực email thành công! Đang chuyển đến trang đăng nhập...");

    // Chuyển về trang login sau 1.5s
    setTimeout(() => {
      onSwitchToLogin();
    }, 1500);
  };

  // Đóng modal OTP
  const handleCloseOTP = () => {
    setShowOTPModal(false);
  };

  return (
    <>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join us today</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl">
            <p className="text-green-400 text-sm text-center">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdPerson className="text-blue-400 text-xl" />
            </div>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdEmail className="text-blue-400 text-xl" />
            </div>
            <input
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-blue-400 text-lg" />
            </div>
            <input
              type="password"
              required
              placeholder="Password"
              minLength={6}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Gender Select */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <BsGenderAmbiguous className="text-blue-400 text-xl" />
            </div>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none cursor-pointer"
              disabled={loading}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-400 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
              disabled={loading}
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPModal
          email={formData.email}
          onClose={handleCloseOTP}
          onVerified={handleOTPVerified}
        />
      )}
    </>
  );
}
