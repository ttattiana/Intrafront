import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login"); // redirige al login
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        {!user && <Link to="/register">Registro</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Intrafront">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;







