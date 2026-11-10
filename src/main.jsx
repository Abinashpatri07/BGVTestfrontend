import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ensureAdminSession } from './utils/sessionManager'

// Auto initialize admin session for direct dashboard access
ensureAdminSession();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
