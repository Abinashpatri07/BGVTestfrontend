import { ensureAdminSession } from "../utils/sessionManager";

function ProtectedRoute({ children }) {
  // Automatically ensure active admin session is present (bypass login)
  ensureAdminSession();

  return children;
}

export default ProtectedRoute;
