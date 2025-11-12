/**
 * Debug helper for authentication
 * Use in browser console: window.debugAuth()
 */

// dev-only helper to inspect / seed auth data in development
// Safe no-op in production. Importing this file in production does nothing.

export function debugAuth(options = {}) {
  const tokenKey = options.tokenKey || 'auth_token';
  const userKey = options.userKey || 'user_info';

  const token = localStorage.getItem(tokenKey);
  const userStr = localStorage.getItem(userKey);

  console.group('debugAuth');
  console.log('Has token:', !!token);
  if (token) {
    console.log('Token (truncated):', token.slice(0, 60) + (token.length > 60 ? '...' : ''));
    // try to decode JWT payload if possible
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('Token payload:', payload);
        if (payload.exp) {
          const exp = new Date(payload.exp * 1000);
          console.log('Token expires at:', exp.toLocaleString());
        }
      }
    } catch (e) {
      // ignore
    }
  }

  console.log('User in localStorage:', userStr ? JSON.parse(userStr) : null);
  console.log('All localStorage keys:', Object.keys(localStorage));

  // If dev and missing, optionally seed a mock user (non-destructive)
  if (import.meta.env.DEV) {
    if (!token && options.seedToken) {
      localStorage.setItem(tokenKey, options.seedToken);
      console.log('Seeded token into localStorage');
    }

    if (!userStr && options.seedUser) {
      localStorage.setItem(userKey, JSON.stringify(options.seedUser));
      console.log('Seeded user into localStorage');
    }
  }

  console.groupEnd();

  return {
    hasToken: !!token,
    token,
    user: userStr ? JSON.parse(userStr) : null,
  };
}

// Attach to window in dev for quick console access
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.debugAuth = debugAuth;
}

export default debugAuth;
