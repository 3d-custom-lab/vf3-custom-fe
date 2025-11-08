import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { motion } from "framer-motion";

/**
 * Protected Route Component
 * Bảo vệ các route yêu cầu authentication và authorization
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component con cần bảo vệ
 * @param {string[]} props.allowedRoles - Mảng các roles được phép truy cập (sử dụng giá trị type từ backend: "ADMIN", "CUSTOMER", etc.)
 * 
 * @example
 * // Chỉ cho phép ADMIN truy cập
 * <ProtectedRoute allowedRoles={["ADMIN"]}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 * 
 * @example
 * // Cho phép nhiều roles
 * <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER"]}>
 *   <SharedPage />
 * </ProtectedRoute>
 * 
 * @returns {React.ReactNode}
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading } = useAuthStore();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Nếu chưa đăng nhập, redirect về trang auth và lưu location để redirect back sau khi login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Nếu có yêu cầu về roles
  if (allowedRoles.length > 0) {
    // Kiểm tra user có role phù hợp không (so sánh với field 'type' từ backend)
    const hasPermission = allowedRoles.includes(user?.type);

    if (!hasPermission) {
      // Nếu không có quyền, redirect về 404
      return <Navigate to="/404" replace />;
    }
  }

  // Nếu pass tất cả các kiểm tra, render children
  return children;
}
