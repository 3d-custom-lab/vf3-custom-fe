import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Lock,
  Shield,
  CreditCard,
  UserPlus,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { createUser } from "../../services/userService";

export default function CreateUserModal({ isOpen, onClose, onSuccess }) {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "MALE",
    type: "CUSTOMER",
    paymentType: "FREE",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        gender: "MALE",
        type: "CUSTOMER",
        paymentType: "FREE",
      });
      setErrors({});
      setShowPassword(false);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await createUser(formData);
      if (response.code === 1000) {
        showSuccess("User created successfully!");
        onSuccess?.();
        onClose();
      } else {
        showError(response.message || "Failed to create user");
      }
    } catch (error) {
      showError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <style>
        {`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes backdropFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-modal-enter {
            animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-backdrop-enter {
            animation: backdropFadeIn 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "animate-backdrop-enter" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
        <div
          className={`pointer-events-auto bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-slate-100 transform transition-all duration-300 ${
            isOpen ? "animate-modal-enter" : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                <UserPlus className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  New Customer
                </h2>
                <p className="text-slate-500 text-sm">
                  Enter the details to register a new account.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all duration-200
                      ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-indigo-500"
                      }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 font-medium ml-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all duration-200
                      ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-indigo-500"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 font-medium ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2.5 rounded-xl border bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all duration-200
                      ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-indigo-500"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/50 transition-all cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 font-medium ml-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Gender Field */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Gender
                </label>
                <div className="flex gap-3 p-1 bg-slate-50 rounded-xl border border-slate-200">
                  {["MALE", "FEMALE"].map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => handleChange("gender", gender)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2
                        ${
                          formData.gender === gender
                            ? "bg-white text-indigo-600 shadow-sm border border-slate-100 ring-1 ring-black/5"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                        }`}
                    >
                      {formData.gender === gender && (
                        <CheckCircle2 size={14} className="text-indigo-600" />
                      )}
                      {gender === "MALE" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Type Field */}
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Shield size={18} />
                  </div>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none cursor-pointer hover:bg-white"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Payment Type (Read only) */}
              <div className="space-y-2 col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Payment Plan
                  </label>
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Active
                  </span>
                </div>
                <div className="relative opacity-75">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <CreditCard size={18} />
                  </div>
                  <input
                    type="text"
                    value={formData.paymentType}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100/50 text-slate-500 cursor-default font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
