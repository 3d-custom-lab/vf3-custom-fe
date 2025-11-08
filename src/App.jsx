import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/customer/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

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
                to={user?.type === "ADMIN" ? "/admin/dashboard" : "/"}
                replace
              />
            ) : (
              <AuthPage />
            )
          }
        />

        {/* Home Page - Public route, ai cũng có thể truy cập */}
        <Route path="/" element={<HomePage />} />

        {/* Customer - Protected route cho CUSTOMER */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Admin - Protected route cho ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found Page */}
        <Route path="/404" element={<NotFoundPage />} />

        {/* Catch all route - Redirect to 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
