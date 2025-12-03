import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
// import ModuloInventario from "./pages/ModuloInventario"; // <-- COMENTADO: Causa error 500. REVISAR ESTE ARCHIVO
import EntregaHerramienta from "./pages/EntregaHerramienta.jsx";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // El menú NO aparece en /login
  const mostrarNavbar = location.pathname !== "/login";

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      {mostrarNavbar && (
        <nav style={{ display: "flex", gap: 24, marginBottom: 32 }}>
          <Link to="/register">Registro</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin-panel">Panel Administrador</Link>
          {/* <Link to="/inventario">Módulo de Inventario</Link> */} {/* <-- COMENTADO TEMPORALMENTE */}
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        {/* <Route path="/inventario" element={<ModuloInventario />} /> */} {/* <-- COMENTADO TEMPORALMENTE */}
        
        {/* Usamos /prestamo para que coincida con el QR si lo ajustas, o mantenemos /entrega */}
        <Route path="/entrega" element={<EntregaHerramienta />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    // ELIMINADO EL basename="/Intrafront"
    <BrowserRouter> 
      <AppContent />
    </BrowserRouter>
  );
}








