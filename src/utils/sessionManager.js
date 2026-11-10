export const DEFAULT_ADMIN_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNsaWVudCBBZG1pbiIsImVtYWlsIjoiYWRtaW5AYmd2LmNvbSIsImNsaWVudF9pZCI6MSwiaWF0IjoxNzk0MzEyMzM0LCJleHAiOjIxMDk2NzIzMzR9.x3FzK5wjp7JgVfvWYXxgDuhfF9MMbA0o7HIv_D_Jv1M";

export const DEFAULT_ADMIN_USER = {
  id: 1,
  name: "Client Admin",
  email: "admin@bgv.com",
  phone: "+91 9876543210",
  role: "Client Admin",
  client_id: 1,
};

export const isTokenExpired = (token) => {
  if (!token || typeof token !== "string") return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    return payload.exp * 1000 < Date.now() + 60000;
  } catch {
    return true;
  }
};

export const ensureAdminSession = (force = false) => {
  if (typeof window === "undefined") return;
  const currentToken = localStorage.getItem("accessToken");
  if (
    force ||
    !currentToken ||
    currentToken === "undefined" ||
    currentToken === "null" ||
    isTokenExpired(currentToken)
  ) {
    localStorage.setItem("accessToken", DEFAULT_ADMIN_TOKEN);
  }
  if (!localStorage.getItem("role") || localStorage.getItem("role") !== "admin") {
    localStorage.setItem("role", "admin");
  }
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(DEFAULT_ADMIN_USER));
  }
};

// Auto-run immediately when imported
ensureAdminSession();

export const LOGIN_PATHS = {
  "super-admin": "/admin/home",
  "admin":       "/admin/home",
  "hr":          "/admin/home",
  "vendor":      "/admin/home",
  "candidate":   "/admin/home",
};

export const normalizeRole = (val) => {
  if (!val) return "";
  const r = String(val).toLowerCase().trim();
  if (r.includes("super")) return "super-admin";
  if (r.includes("admin") || r.includes("client")) return "admin";
  if (r.startsWith("hr")) return "hr";
  if (r.includes("vendor")) return "vendor";
  if (r.includes("candidate")) return "candidate";
  return r;
};

export const clearAllAuthSessions = () => {
  ensureAdminSession(true);
};

export const getTokenForRole = (role) => {
  ensureAdminSession();
  const norm = normalizeRole(role);
  if (norm === "candidate") return localStorage.getItem("candidateToken") || localStorage.getItem("accessToken") || DEFAULT_ADMIN_TOKEN;
  if (norm === "vendor") return localStorage.getItem("vendorToken") || localStorage.getItem("accessToken") || DEFAULT_ADMIN_TOKEN;
  return localStorage.getItem("accessToken") || DEFAULT_ADMIN_TOKEN;
};
