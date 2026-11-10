import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminRoutes from "./AdminRoutes";
import ForgotPassword from "../pages/clientAdmin/ForgotPassword";
import SetupClientPasswordPage from "../pages/clientAdmin/SetupClientPasswordPage";
import { ensureAdminSession } from "../utils/sessionManager";

function AppRoutes() {
  ensureAdminSession();

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / Direct Dashboard (Login bypassed) */}
        <Route path="/" element={<Navigate to="/admin/home" replace />} />
        <Route path="/login" element={<Navigate to="/admin/home" replace />} />

        {/* Client Admin Password Setup & Reset Routes */}
        <Route path="/setup-password" element={<SetupClientPasswordPage />} />
        <Route path="/reset-password" element={<SetupClientPasswordPage />} />
        <Route path="/client-setup-password" element={<SetupClientPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Client Admin Portal Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Fallback to Admin Dashboard */}
        <Route path="*" element={<Navigate to="/admin/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
