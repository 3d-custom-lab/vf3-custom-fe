import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/customer/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuthStore } from "./store/authStore";
import { ROLES } from "./utils/constants";

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
          path="/auth"
          element={
            isAuthenticated ? (
              // Nếu đã đăng nhập, redirect về trang tương ứng với role
              <Navigate
                to={user?.type === ROLES.ADMIN ? "/admin/dashboard" : "/"}
                replace
              />
            ) : (
              <AuthPage />
            )
          }
        />

        <Route path="/" element={<HomePage />} />

        {/* Customer Routes */}
        {/* <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
              <HomePage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - Tất cả routes admin có prefix /admin */}
        <Route
          path="/admin/dashboard"
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
                to={user?.type === ROLES.ADMIN ? "/admin/dashboard" : "/"}
                replace
              />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
