/**
 * Debug helper for authentication
 * Use in browser console: window.debugAuth()
 */

export const debugAuth = () => {
  const token = localStorage.getItem("auth_token");
  const userStr = localStorage.getItem("user_info");
  
  console.group("🔐 Authentication Debug");
  console.log("Token exists:", !!token);
  if (token) {
    console.log("Token preview:", token.substring(0, 50) + "...");
    
    // Try to decode JWT token (if it's a JWT)
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log("Token payload:", payload);
        
        // Check expiration
        if (payload.exp) {
          const expirationDate = new Date(payload.exp * 1000);
          const isExpired = expirationDate < new Date();
          console.log("Token expiration:", expirationDate.toLocaleString());
          console.log("Token expired:", isExpired);
        }
      }
    } catch (e) {
      console.log("Token is not a valid JWT or cannot be decoded");
    }
  } else {
    console.log("❌ No token found in localStorage");
  }
  
  console.log("\nUser info:", userStr ? JSON.parse(userStr) : "No user info");
  console.log("\nAll localStorage keys:", Object.keys(localStorage));
  console.groupEnd();
  
  return {
    hasToken: !!token,
    token: token,
    user: userStr ? JSON.parse(userStr) : null
  };
};

// Make it available globally in dev mode
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.debugAuth = debugAuth;
}

export default debugAuth;
