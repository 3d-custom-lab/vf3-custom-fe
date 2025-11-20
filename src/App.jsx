import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/auth/AuthPage";
// CUSTOMER ROUTES IMPORTS
import HomePage from "./pages/customer/HomePage";
import StudioPage from "./pages/customer/StudioPage";
import ForumPage from "./pages/customer/ForumPage";
import ProfilePage from "./pages/customer/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// ADMIN ROUTES IMPORTS
import DashboardPage from "./pages/admin/DashboardPage";
import ManageUserPage from "./pages/admin/ManageUserPage";
import ManageGaraPage from "./pages/admin/ManageGaraPage";
import ManageCarPage from "./pages/admin/ManageCarPage";
import ManageForumPage from "./pages/admin/ManageForumPage";

function AppRoutes() {
  const { isAuthenticated, checkAuth, getHomeRoute } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      {/* Auth Route */}
      <Route path="/auth" element={
          isAuthenticated ? (
            <Navigate to={getHomeRoute()} replace />
          ) : (
            <AuthPage />
          )
        }
      />

      {/* Public Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Customer Routes */}
      <Route path="/studio" element={
          <ProtectedRoute>
            <StudioPage />
          </ProtectedRoute>
        }
      />
      <Route path="/forum" element={
          <ProtectedRoute>
            <ForumPage />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageUserPage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/garas" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageGaraPage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/cars" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageCarPage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/forum" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageForumPage />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="/404" element={<NotFoundPage />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
