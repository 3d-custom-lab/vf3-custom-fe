export const ROLE_KEYS = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

// Default mapping from role -> home route. Keep centralized here.
const ROLE_HOME_MAP = {
  [ROLE_KEYS.ADMIN]: "/admin/dashboard",
  [ROLE_KEYS.CUSTOMER]: "/",
};

export function getHomeRouteForRole(role, fallback = "/") {
  if (!role) return fallback;
  // Use direct mapping if available
  if (ROLE_HOME_MAP[role]) return ROLE_HOME_MAP[role];

  const normalized = String(role).toLowerCase();
  if (normalized.includes("admin")) return "/admin/dashboard";
  if (normalized.includes("customer") || normalized.includes("user"))
    return "/";

  // Fallback
  return fallback;
}

export function isAdminRole(role) {
  return role === ROLE_KEYS.ADMIN || String(role).toLowerCase().includes("admin");
}

export default {
  ROLE_KEYS,
  getHomeRouteForRole,
  isAdminRole,
};
