import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, introspect } from "../services/authService";

// Storage keys - hardcode trực tiếp
const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_info",
};

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
            
            // Set token và authenticated state
            set({ 
              token, 
              isAuthenticated: true,
              // Hardcode user info từ login response (vì chưa có API /users/my-info)
              user: {
                email: email,
                type: res.result.type || "CUSTOMER", // Lấy type từ response hoặc mặc định là CUSTOMER
              }
            });

            // Lưu user info vào localStorage
            const userInfo = {
              email: email,
              type: res.result.type || "CUSTOMER",
            };
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userInfo));

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
            // Nếu có user trong localStorage, load lên
            let user = null;
            if (userStr) {
              try {
                user = JSON.parse(userStr);
              } catch (e) {
                console.error("Failed to parse user data:", e);
              }
            }

            set({ token, isAuthenticated: true, user });
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

      logout: () => {
        // API logout chưa được implement ở backend, chỉ xóa dữ liệu ở client
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        });
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
