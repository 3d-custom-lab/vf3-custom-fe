import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/customer/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuthStore } from "./store/authStore";
import { ROUTES, ROLES } from "./utils/constants";

export default function App() {
  const { isAuthenticated, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route - Trang đăng nhập/đăng ký */}
        <Route
          path={ROUTES.AUTH}
          element={
            isAuthenticated ? (
              // Nếu đã đăng nhập, redirect về trang tương ứng với role
              <Navigate
                to={
                  user?.type === ROLES.ADMIN
                    ? ROUTES.ADMIN_DASHBOARD
                    : ROUTES.HOME
                }
                replace
              />
            ) : (
              <AuthPage />
            )
          }
        />

        {/* Customer Routes */}
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.CUSTOMER_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - Tất cả routes admin có prefix /admin */}
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - Redirect về auth nếu chưa đăng nhập */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate
                to={
                  user?.type === ROLES.ADMIN
                    ? ROUTES.ADMIN_DASHBOARD
                    : ROUTES.HOME
                }
                replace
              />
            ) : (
              <Navigate to={ROUTES.AUTH} replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
