import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginAPI, introspect } from '../services/authService';
import { getUserInfo } from '../services/userService';
import { getCookie, setCookie, clearAuthCookies } from '../utils/cookieUtils';
import { getUserFromToken, isTokenExpired } from '../utils/jwtUtils';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from cookie
  const initAuth = useCallback(async () => {
    setLoading(true);
    try {
      const savedToken = getCookie('auth_token');
      
      if (!savedToken) {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(savedToken)) {
        clearAuthCookies();
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      // Do not call introspect on every app load. If token exists and not expired,
      // derive user info directly from token (introspect is only run once after login)
      const userInfo = getUserFromToken(savedToken);
      if (userInfo) {
        setToken(savedToken);
        setUser(userInfo);
        setIsAuthenticated(true);
      } else {
        clearAuthCookies();
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error('Auth initialization failed:', err);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login user
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await loginAPI({ email, password });

      if (res.result?.token && res.result?.authenticated) {
        const jwtToken = res.result.token;

        try {
          const validRes = await introspect(jwtToken);
          if (!validRes.result?.valid) {
            setError('Token verification failed');
            setLoading(false);
            return { success: false, error: 'Token verification failed' };
          }
        } catch {
          setError('Token verification failed');
          setLoading(false);
          return { success: false, error: 'Token verification failed' };
        }

        const userInfo = getUserFromToken(jwtToken);

        if (!userInfo || !userInfo.role) {
          setError('Invalid token: role not found');
          setLoading(false);
          return { success: false, error: 'Invalid token: role not found' };
        }

        setCookie('auth_token', jwtToken, 7);

        try {
          const userInfoRes = await getUserInfo();
          if (userInfoRes.code === 0 || userInfoRes.code === 1000) {
            const fullUserInfo = {
              ...userInfo,
              ...userInfoRes.result,
            };
            setToken(jwtToken);
            setUser(fullUserInfo);
            setIsAuthenticated(true);
            setLoading(false);
            return { success: true, token: jwtToken, user: fullUserInfo };
          }
        } catch {
          setToken(jwtToken);
          setUser(userInfo);
          setIsAuthenticated(true);
          setLoading(false);
          return { success: true, token: jwtToken, user: userInfo };
        }

        setToken(jwtToken);
        setUser(userInfo);
        setIsAuthenticated(true);

        setLoading(false);
        return { success: true, token: jwtToken, user: userInfo };
      } else {
        setError('Login failed');
        setLoading(false);
        return { success: false, error: 'Login failed' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    clearAuthCookies();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Get user role
   */
  const getRole = useCallback(() => {
    return user?.role || null;
  }, [user]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (role) => {
      return user?.role === role;
    },
    [user]
  );

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback(
    (roles) => {
      return roles.includes(user?.role);
    },
    [user]
  );

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Get home route for user based on role from JWT
   */
  const getHomeRoute = useCallback(() => {
    if (!user?.role) return '/';
    
    const role = user.role.toUpperCase();
    
    if (role === 'ADMIN') return '/admin/dashboard';
    if (role === 'CUSTOMER') return '/';
    
    // Default fallback
    return '/';
  }, [user]);

  // Initialize auth on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    getRole,
    hasRole,
    hasAnyRole,
    clearError,
    getHomeRoute,
    checkAuth: initAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
