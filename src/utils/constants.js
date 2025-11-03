/**
 * Constants for application-wide configuration
 */

// User roles trong hệ thống
export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

// Route paths
export const ROUTES = {
  // Auth routes
  AUTH: "/auth",

  // Customer routes
  HOME: "/",
  CUSTOMER_DASHBOARD: "/customer/dashboard",

  // Admin routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PREFIX: "/admin",
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
};
