import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./Login.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1);
  const [challenge, setChallenge] = useState(null);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/login", form);
      setChallenge(res.data.challenge);
      setStep(2);
      setMsg("Se envió un código OTP por SMS.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  const handleOTP = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/verify-otp", { challenge, code: otp });
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
                onChange={e => setOtp(e.target.value)}
                required
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







