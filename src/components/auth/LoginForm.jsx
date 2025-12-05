import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import Toast from "../ui/Toast";

export default function LoginForm({ onSwitchToRegister, onForgotPassword }) {
  const navigate = useNavigate();
  const { login, loading, error, clearError, getHomeRoute } = useAuth();
  const { toast, showSuccess, hideToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
  });
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  // Xử lý Google Login
  const handleGoogleLogin = () => {
    const callbackUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URL || 'http://localhost:5173/auth/google/callback';
    const authUrl = import.meta.env.VITE_GOOGLE_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth';
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      alert('Missing Google Client ID configuration.');
      return;
    }

    const url = new URL(authUrl);
    url.searchParams.set('client_id', googleClientId);
    url.searchParams.set('redirect_uri', callbackUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid email profile');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('prompt', 'consent');

    window.location.href = url.toString();
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const password = passwordRef.current ? passwordRef.current.value : "";
    const result = await login(formData.email, password);

    if (result.success) {
      showSuccess("Login successful! Welcome back.");
      // Clear password input after use
      if (passwordRef.current) passwordRef.current.value = "";

      // Redirect to home route based on user role from JWT
      const homeRoute = getHomeRoute();
      navigate(homeRoute);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to your account</p>
      </div>

      {/* Hiển thị error message nếu có */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            ref={passwordRef}
            onChange={() => {
              /* intentionally uncontrolled for security */
            }}
            className="w-full pl-12 pr-12 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-200"
            disabled={loading}
          >
            {showPassword ? (
              <FaEyeSlash className="text-lg" />
            ) : (
              <FaEye className="text-lg" />
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="cursor-pointer text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full py-3.5 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-400 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-800 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="cursor-pointer w-full py-3.5 bg-white/5 border border-gray-700 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle className="text-2xl" />
          <span>Login with Google</span>
        </button>
      </form>

      {/* Switch to Register */}
      <div className="text-center mt-8">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="cursor-pointer text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
            disabled={loading}
          >
            Sign up
          </button>
        </p>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
    </div>
  );
}
