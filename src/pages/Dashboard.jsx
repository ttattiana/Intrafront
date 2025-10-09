import React from "react";

export default function Dashboard({ onLogout }) {
    return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#222",
      position: "relative"
    }}>
      <button
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          padding: "12px 28px",
          backgroundColor: "#d33636",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "1.2rem",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={onLogout}
      >
        Cerrar sesión
      </button>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "48px",
      }}>
        <button style={{
          flex: 1,
          height: "80vh",
          maxWidth: "680px",
          backgroundColor: "#3153e6",
          color: "white",
          borderRadius: "32px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          margin: 0,
        }}>
          <div style={{ fontSize: "8rem", marginBottom: "32px" }}>🏢</div>
          Empresa
        </button>
        <button style={{
          flex: 1,
          height: "80vh",
          maxWidth: "680px",
          backgroundColor: "#3153e6",
          color: "white",
          borderRadius: "32px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          margin: 0,
        }}>
          <div style={{ fontSize: "8rem", marginBottom: "32px" }}>📦🔧</div>
          Inventario y Herramientas
        </button>
      </div>
    </div>
  );
}




