// JWT Token utilities
export function decodeJWT(token) {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

// Extract role from JWT token
export function getRoleFromToken(token) {
  const payload = decodeJWT(token);
  if (!payload) return null;

  // Extract role from scope field (e.g., "ROLE_ADMIN" -> "ADMIN")
  if (payload.scope) {
    const scope = payload.scope;
    // Remove "ROLE_" prefix if present
    return scope.startsWith("ROLE_") ? scope.substring(5) : scope;
  }

  return null;
}

// Check if JWT token is expired
export function isTokenExpired(token) {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  const expirationDate = new Date(payload.exp * 1000);
  return expirationDate < new Date();
}

// Get user info from JWT token
export function getUserFromToken(token) {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    email: payload.sub || null,
    role: getRoleFromToken(token),
    exp: payload.exp || null,
    iat: payload.iat || null,
  };
}
