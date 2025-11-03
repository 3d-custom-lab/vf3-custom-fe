import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  login,
  introspect,
  getCurrentUser,
  logout as logoutService,
} from "../services/authService";
import { STORAGE_KEYS } from "../utils/constants";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null, // Thông tin user hiện tại
      token: null, // JWT token
      isAuthenticated: false, // Trạng thái đăng nhập
      loading: false, // Trạng thái loading
      error: null, // Lỗi nếu có

      loginUser: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await login({ email, password });

          // Kiểm tra response có token không
          if (res.result?.token && res.result?.authenticated) {
            const token = res.result.token;

            // Lưu token vào localStorage
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            set({ token, isAuthenticated: true });

            // Lấy thông tin user sau khi login thành công
            await get().fetchUserInfo();

            return { success: true, token };
          } else {
            set({ error: "Đăng nhập thất bại" });
            return { success: false, error: "Đăng nhập thất bại" };
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ loading: false });
        }
      },

      fetchUserInfo: async () => {
        try {
          const res = await getCurrentUser();
          if (res.result) {
            const user = res.result;
            set({ user });
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          }
        } catch (err) {
          console.error("Failed to fetch user info:", err);
          // Nếu không lấy được thông tin user, logout
          get().logout();
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);

        if (!token) {
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }

        try {
          // Verify token với backend
          const res = await introspect(token);

          if (res.result?.valid) {
            set({ token, isAuthenticated: true });

            // Nếu có user trong localStorage, load lên
            if (userStr) {
              try {
                const user = JSON.parse(userStr);
                set({ user });
              } catch (e) {
                console.error("Failed to parse user data:", e);
              }
            }

            // Fetch lại thông tin user mới nhất
            await get().fetchUserInfo();
          } else {
            // Token không hợp lệ, xóa và logout
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
            set({ isAuthenticated: false, user: null, token: null });
          }
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          set({ isAuthenticated: false, user: null, token: null });
        }
      },

      logout: async () => {
        try {
          // Gọi API logout nếu có
          await logoutService();
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          // Xóa tất cả dữ liệu auth
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      /**
       * Clear error message
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Kiểm tra user có role cụ thể hay không
       * @param {string} role - Role cần kiểm tra
       * @returns {boolean}
       */
      hasRole: (role) => {
        const { user } = get();
        return user?.type === role;
      },

      /**
       * Kiểm tra user có một trong các roles hay không
       * @param {string[]} roles - Mảng các roles cần kiểm tra
       * @returns {boolean}
       */
      hasAnyRole: (roles) => {
        const { user } = get();
        return roles.includes(user?.type);
      },
    }),
    {
      name: "auth-storage", // Key trong localStorage
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
