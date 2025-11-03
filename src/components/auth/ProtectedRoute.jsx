import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ROUTES } from "../../utils/constants";

/**
 * Protected Route Component
 * Bảo vệ các route yêu cầu authentication và authorization
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component con cần bảo vệ
 * @param {string[]} props.allowedRoles - Mảng các roles được phép truy cập (optional)
 * @returns {React.ReactNode}
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user } = useAuthStore();

  // Nếu chưa đăng nhập, redirect về trang auth
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  // Nếu có yêu cầu về roles
  if (allowedRoles.length > 0) {
    // Kiểm tra user có role phù hợp không
    const hasPermission = allowedRoles.includes(user?.type);

    if (!hasPermission) {
      // Nếu không có quyền, redirect về trang chủ tương ứng với role
      const redirectPath =
        user?.type === "ADMIN" ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME;

      return <Navigate to={redirectPath} replace />;
    }
  }

  // Nếu pass tất cả các kiểm tra, render children
  return children;
}
