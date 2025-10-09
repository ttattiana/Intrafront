import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./Login.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1); // Paso 1: Login, Paso 2: OTP
  const [challenge, setChallenge] = useState(null);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Actualiza los inputs email y password
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Envía email y password para obtener el challenge (OTP enviado)
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/login", form);
      setChallenge(res.data.challenge); // Guarda el challenge UUID recibido
      setStep(2); // Cambia al paso de validación OTP
      setMsg("Se envió un código OTP por SMS.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error en inicio de sesión");
    }
  };

  // Envía el OTP junto con el challenge para verificar y obtener user info
  const handleOTP = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/verify-otp", { challenge, code: otp });
      onLogin(res.data.user); // Guarda usuario en contexto o estado global
      navigate("/dashboard"); // Redirige a dashboard tras login exitoso
    } catch (err) {
      setMsg(err.response?.data?.message || "Error al verificar OTP");
    }
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="login-wrapper">
        <div className="login-center">
          <img src={logo} alt="Logotipo" className="login-logo" />
          {step === 1 && (
            <form onSubmit={handleLogin} className="login-form">
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
              <button type="submit">Iniciar sesión</button>
              <p>{msg}</p>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleOTP} className="login-form">
              <input
                placeholder="Código OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                pattern="\d{6}"
                title="Ingresa un código OTP de 6 dígitos"
              />
              <button type="submit">Verificar OTP</button>
              <p>{msg}</p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
