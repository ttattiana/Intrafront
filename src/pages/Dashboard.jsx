import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  // Color único para todos los cuadros
  const cardColor = "linear-gradient(145deg, #275efa 70%, #76dfff 120%)";

  const cards = [
    {
      label: "Empresa",
      icon: "🏢",
      onClick: null
    },
    {
      label: "Módulo de Inventario",
      icon: (
        <span>
          <span style={{ fontSize: 42 }}>📦</span>
          <span style={{ fontSize: 40, marginLeft: -15 }}>🔧</span>
        </span>
      ),
      onClick: () => navigate("/inventario")
    },
    {
      label: "Panel Administrador",
      icon: "🛠️",
      onClick: () => navigate("/admin-panel")
    }
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#22263D 62%,#2760ff 100%)",
        position: "relative",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif"
      }}
    >
      <button
        style={{
          position: "absolute",
          top: 32,
          right: 42,
          padding: "13px 34px",
          backgroundColor: "#EF436B",
          color: "#fff",
          border: "none",
          borderRadius: "15px",
          fontWeight: 700,
          fontSize: "1.1rem",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 2px 18px rgba(220,60,60,0.08)",
          letterSpacing: 0.2
        }}
        onClick={onLogout}
        onMouseOver={e => (e.currentTarget.style.background = "#d32456")}
        onMouseOut={e => (e.currentTarget.style.background = "#EF436B")}
      >
        Cerrar sesión
      </button>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          gap: 46,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {cards.map(({ label, icon, onClick }) => (
          <button
            key={label}
            style={{
              flex: 1,
              minWidth: 320,
              maxWidth: 420,
              minHeight: 430,
              background: cardColor,
              color: "#fff",
              borderRadius: "36px",
              border: "none",
              cursor: onClick ? "pointer" : "default",
              margin: 0,
              padding: 0,
              boxShadow: "0 12px 40px 0 rgba(24,40,130,0.13)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.25rem",
              fontWeight: 700,
              transition: "box-shadow 0.15s, transform 0.16s",
              position: "relative"
            }}
            onClick={onClick}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = "0 18px 32px 2px rgba(70,140,255,0.17)";
              e.currentTarget.style.transform = "translateY(-9px) scale(1.045)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(24,40,130,0.13)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 106,
                height: 106,
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                fontSize: 64,
                marginBottom: 38,
                boxShadow: "0 3px 12px 0 rgba(110,180,255,0.09)"
              }}
            >
              {icon}
            </div>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                lineHeight: 1.16,
                letterSpacing: "-1px",
                textShadow: "0 4px 12px rgba(42,62,122,0.10)",
                textAlign: "center"
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}










