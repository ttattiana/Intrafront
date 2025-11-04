// src/pages/AdminPanel.jsx
import React from "react";
import Register from "./Register"; // Ajusta la ruta si Register está en otra carpeta

export default function AdminPanel() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Formulario de registro aquí */}
      <Register />
    </div>
  );
}

