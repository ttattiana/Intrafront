import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./Login.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/register", form);
      // Puedes cambiar la lógica aquí para diferenciar login y registro
      onLogin(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="login-wrapper">
        <div className="login-center">
          <img src={logo} alt="Logotipo" className="login-logo" />
          <form onSubmit={handleSubmit} className="login-form">
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
            <button type="submit">Registro</button>
            <p>{msg}</p>
          </form>
        </div>
      </div>
    </>
  );
}