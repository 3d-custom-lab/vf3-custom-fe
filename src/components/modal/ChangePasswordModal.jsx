import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Eye, EyeOff, Loader2, Key, Check } from "lucide-react";
import { changePassword } from "../../services/authService";
import useToast from "../../hooks/useToast";

export default function ChangePasswordModal({ isOpen, onClose, userId }) {
  const { showSuccess, showError } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const validateForm = () => {
    if (!oldPassword.trim()) {
      setError("Please enter your current password");
      return false;
    }
    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return false;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return false;
    }
    if (newPassword === oldPassword) {
      setError("New password must be different from current password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await changePassword(userId, oldPassword, newPassword);
      if (response.code === 0 || response.code === 1000) {
        showSuccess("Password has been changed successfully!");
        handleClose();
      } else {
        setError(response.message || "Failed to change password");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to change password. Please check your current password and try again.";
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setShowOldPassword(false);
    setShowNewPassword(false);
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="bg-slate-900 rounded-2xl shadow-xl max-w-md w-full border border-slate-800"
            >
              <div className="bg-slate-800 p-5 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Change Password
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Update your account password
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="p-2 rounded-lg text-slate-300 hover:bg-slate-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/40 rounded-lg"
                  >
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Current Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your current password"
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:border-blue-500 focus:outline-none"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition cursor-pointer"
                      disabled={loading}
                    >
                      {showOldPassword ? (
                        <EyeOff size={18} className="cursor-pointer" />
                      ) : (
                        <Eye size={18} className="cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    New Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter new password (min 6 characters)"
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 focus:border-blue-500"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition cursor-pointer"
                      disabled={loading}
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} className="cursor-pointer" />
                      ) : (
                        <Eye size={18} className="cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Confirm New Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Confirm new password"
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700  focus:border-blue-500"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition cursor-pointer"
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} className="cursor-pointer" />
                      ) : (
                        <Eye size={18} className="cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-2 font-medium">
                    Password Requirements:
                  </p>
                  <ul className="text-xs space-y-2">
                    {/* At least 6 characters */}
                    <li className="flex items-center gap-2">
                      {newPassword.length > 0 ? (
                        newPassword.length >= 6 ? (
                          <Check size={14} className="text-green-400 shrink-0" />
                        ) : (
                          <X size={14} className="text-red-400 shrink-0" />
                        )
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 shrink-0" />
                      )}
                      <span
                        className={
                          newPassword.length > 0
                            ? newPassword.length >= 6
                              ? "text-green-400"
                              : "text-red-400"
                            : "text-slate-400"
                        }
                      >
                        At least 6 characters long
                      </span>
                    </li>

                    {/* Different from current password */}
                    <li className="flex items-center gap-2">
                      {newPassword.length > 0 && oldPassword.length > 0 ? (
                        newPassword !== oldPassword ? (
                          <Check size={14} className="text-green-400 shrink-0" />
                        ) : (
                          <X size={14} className="text-red-400 shrink-0" />
                        )
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 shrink-0" />
                      )}
                      <span
                        className={
                          newPassword.length > 0 && oldPassword.length > 0
                            ? newPassword !== oldPassword
                              ? "text-green-400"
                              : "text-red-400"
                            : "text-slate-400"
                        }
                      >
                        Different from current password
                      </span>
                    </li>

                    {/* Passwords match */}
                    <li className="flex items-center gap-2">
                      {confirmPassword.length > 0 ? (
                        newPassword === confirmPassword && newPassword.length > 0 ? (
                          <Check size={14} className="text-green-400 shrink-0" />
                        ) : (
                          <X size={14} className="text-red-400 shrink-0" />
                        )
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 shrink-0" />
                      )}
                      <span
                        className={
                          confirmPassword.length > 0
                            ? newPassword === confirmPassword && newPassword.length > 0
                              ? "text-green-400"
                              : "text-red-400"
                            : "text-slate-400"
                        }
                      >
                        Passwords match
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    className="cursor-pointer flex-1 py-3 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      "Change Password"
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
