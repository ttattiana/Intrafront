import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EntregaHerramienta() {
  const [params] = useSearchParams();
  const idHerramienta = params.get("id");
  const [form, setForm] = useState({ nombre: "", apellido: "", hora: "" });
  const [estado, setEstado] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setEstado("¡Registro simulado: " + JSON.stringify({ idHerramienta, ...form }) + " !");
  };

  const inputStyle = {
    background: "#232a3e",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "21px 20px",
    fontSize: "1.5rem",
    marginBottom: "18px",
    width: "100%",
    outline: "none"
  };

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 490,
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* LOGO empresa: asegúrate que el path esté bien */}
      


      <h2 style={{
        fontSize: "2rem",
        textAlign: "center",
        marginBottom: 18,
        fontWeight: "bold",
        color: "#fafafa"
      }}>
        Registro préstamo de herramienta
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
          alignItems: "center"
        }}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {/* Texto arriba del campo de hora */}
        <div style={{
          color: '#bbb',
          fontSize: '1.14rem',
          marginBottom: '2px',
          textAlign: "center",
          width: '100%'
        }}>
          Seleccione hora en que adquiere la herramienta
        </div>
        <input
          name="hora"
          type="time"
          value={form.hora}
          onChange={handleChange}
          required
          style={inputStyle}
          title="Seleccione hora en que adquiere la herramienta"
        />
        <input
          name="idHerramienta"
          value={idHerramienta ?? ""}
          disabled
          style={{ ...inputStyle, fontWeight: "bold", background: "#1a2440", color: "#87fff9" }}
        />

        <button
          type="submit"
          style={{
            background: "#3264fe",
            color: "#fff",
            padding: "18px 0",
            border: "none",
            borderRadius: 12,
            fontSize: "1.33rem",
            fontWeight: "bold",
            marginTop: "8px",
            width: "100%"
          }}>
          Registrar
        </button>
      </form>

      <div style={{
        marginTop: 18,
        color: "green",
        fontSize: "1.11rem",
        textAlign: "center"
      }}>{estado}</div>
    </div>
  );
}


