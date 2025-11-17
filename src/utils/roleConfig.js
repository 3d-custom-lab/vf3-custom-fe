// Centralized role -> route configuration
// Keep this as the single source of truth for role-related routing decisions.
// To avoid scattering role string checks across the app, import and use the
// helpers below. If you later want to drive this from the backend or env
// variables, update this module only.

/**
 * Role keys as expected from the backend user 'type' field.
 * Exported so other modules can reference the canonical values.
 */
export const ROLE_KEYS = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

// Default mapping from role -> home route. Keep centralized here.
const ROLE_HOME_MAP = {
  [ROLE_KEYS.ADMIN]: "/admin/dashboard",
  [ROLE_KEYS.CUSTOMER]: "/",
};

/**
 * Resolve the default route for a given role value coming from backend.
 * If role is falsy or unknown, returns the fallback route (default: '/').
 */
export function getHomeRouteForRole(role, fallback = "/") {
  if (!role) return fallback;
  // Use direct mapping if available
  if (ROLE_HOME_MAP[role]) return ROLE_HOME_MAP[role];

  // Generic heuristics (avoid hardcoding many role strings):
  // - If role contains 'admin' (case-insensitive), route to admin area
  // - If role contains 'customer' or 'user' -> route to root
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
