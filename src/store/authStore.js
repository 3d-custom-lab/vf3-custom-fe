import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, introspect } from "../services/authService";

const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_info",
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      loginUser: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await login({ email, password });

          if (res.result?.token && res.result?.authenticated) {
            const token = res.result.token;

            // Persist token
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);

            // Determine user object. Prefer backend-provided user object if present.
            const backendUser = res.result.user || null;
            const userObj = backendUser
              ? backendUser
              : {
                  email,
                  type: res.result.type || "NONE",
                };

            // Persist user info
            try {
              localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userObj));
            } catch (e) {
              console.warn("Unable to persist user info:", e);
            }

            set({ token, isAuthenticated: true, user: userObj });

            return { success: true, token };
          } else {
            set({ error: "Login failed" });
            return { success: false, error: "Login failed" };
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            "Login failed. Please check your credentials.";
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
          const res = await introspect(token);

          if (res.result?.valid) {
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
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        set({ user: null, token: null, isAuthenticated: false, error: null, loading: false });
      },

      clearError: () => {
        set({ error: null });
      },

      hasRole: (role) => {
        const { user } = get();
        return user?.type === role;
      },

      hasAnyRole: (roles) => {
        const { user } = get();
        return roles.includes(user?.type);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated, user: state.user }),
    }
  )
);
