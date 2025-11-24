import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading, getHomeRoute } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0) {
    const userRole = user?.role;
    const hasPermission = allowedRoles.includes(userRole);

    if (!hasPermission) {
      const redirectTo = getHomeRoute();
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children;
}
