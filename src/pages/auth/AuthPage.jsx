import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar } from "react-icons/fa";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import ForgotPasswordModal from "../../components/modal/ForgotPasswordModal";
import ResetPasswordModal from "../../components/modal/ResetPasswordModal";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Handle forgot password flow
  const handleForgotPasswordSuccess = (email) => {
    setResetEmail(email);
    setShowForgotPasswordModal(false);
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordSuccess = () => {
    setShowResetPasswordModal(false);
    setResetEmail("");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-cyan-900/10" />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-32 h-32 shadow-2xl shadow-blue-500/50 mb-6"
          >
            <img src="/img/logo.png" alt="VF3 Logo" className="w-full h-full" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-2"
          >
            3D <span className="text-blue-400">Custom</span> Lab
          </motion.h1>
        </div>

        <div className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5" />

          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent" />

          <div className="relative">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm 
                    onSwitchToRegister={() => setIsLogin(false)}
                    onForgotPassword={() => setShowForgotPasswordModal(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onSuccess={handleForgotPasswordSuccess}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false);
          setResetEmail("");
        }}
        email={resetEmail}
        onSuccess={handleResetPasswordSuccess}
      />
    </div>
  );
}
