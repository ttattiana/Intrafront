import { useState } from "react";
import { api } from "../api/client";
import logo from "../assets/logo.jpg"; // Usa tu logotipo
import "./Login.css"; // Reutiliza los mismos estilos que el login

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/register", form);
      setMsg(data.message);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-background">
      <div className="login-center">
        <img src={logo} alt="Logotipo" className="login-logo" />
        <form onSubmit={onSubmit} className="login-form">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={onChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={onChange}
            required
          />
          <input
            name="phone"
            placeholder="Teléfono (Ej: +57315XXXXXXX)"
            value={form.phone}
            onChange={onChange}
            required
          />
          <button type="submit">Registrar</button>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
}

