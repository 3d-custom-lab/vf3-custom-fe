import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../ui/Loading";

/**
 * Protected Route Component
 * Protects routes based on authentication and role-based authorization
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Component to protect
 * @param {string[]} props.allowedRoles - Array of allowed roles (e.g., ["ADMIN", "CUSTOMER"])
 * 
 * @example
 * <ProtectedRoute allowedRoles={["ADMIN"]}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading, getHomeRoute } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <Loading fullScreen variant="spinner" size="lg" text="Verifying authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based authorization if allowedRoles is specified
  if (allowedRoles.length > 0) {
    const userRole = user?.role;
    const hasPermission = allowedRoles.includes(userRole);

    if (!hasPermission) {
      // Redirect to user's home route based on their role
      const redirectTo = getHomeRoute();
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children;
}
