import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";
import Webcam from "react-webcam";
import { FRONT_BASE } from "../config";


// Estilo base para input
const inputStyle = {
  background: "#111623",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "11px 16px",
  fontSize: "1.1rem",
  outline: "none"
};

export default function ModuloInventario() {
  const [equipos, setEquipos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", tipo: "energía", marca: "", modelo: "", serial: "" });
  const [qrData, setQrData] = useState(null);
  const [scanned, setScanned] = useState("");
  const qrCanvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  function printQR(equipo) {
    setQrData(`${FRONT_BASE}/entrega?id=${equipo.serial}`);
    setTimeout(() => {
      const canvas = qrCanvasRef.current.querySelector("canvas");
      const dataUrl = canvas ? canvas.toDataURL() : "";
      const qrWin = window.open("", "_blank", "width=400,height=600");
      const contenido = `
        <div style="display:flex;flex-direction:column;align-items:center;font-family:sans-serif;padding:12px;">
          <img src="/Intrafront/logo.jpg" alt="OPTIMACOM" style="height:60px;margin-bottom:8px;" />
          <h2 style="margin-bottom:10px;">Equipo: ${equipo.nombre}</h2>
          <img src="${dataUrl}" alt="Código QR" style="margin:16px 0;" />
          <div style="font-size:1rem">
            <strong>Tipo:</strong> ${equipo.tipo}<br>
            <strong>Marca:</strong> ${equipo.marca}<br>
            <strong>Modelo:</strong> ${equipo.modelo}<br>
          </div>
          <div style="margin-top:26px; font-size:1.3rem; color:#222; font-weight:bold; border-top:2px solid #eee; width:80%; text-align:center;">
            Serial: ${equipo.serial}
          </div>
        </div>
      `;
      qrWin.document.write(contenido);
      qrWin.document.close();
      qrWin.focus();
      qrWin.print();
    }, 200);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    const equipo = { id: Date.now(), ...form };
    setEquipos([equipo, ...equipos]);
    setQrData(`${FRONT_BASE}/entrega?id=${equipo.serial}`);
    setShowForm(false);
    setForm({ nombre: "", tipo: "energía", marca: "", modelo: "", serial: "" });

    // Enviar datos (incluyendo screenshot) al backend
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (screenshot) data.append("foto", screenshot);
    await fetch('/api/register_tool', {
      method: 'POST',
      body: data,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #202428 70%, #2d5fff 100%)",
        color: "#fff",
        padding: 0,
        margin: 0,
        boxSizing: "border-box"
      }}
    >
      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "54px 28px 36px 28px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 46
        }}>
          <h1 style={{ fontWeight: 800, fontSize: 46, letterSpacing: -2, margin: 0 }}>Equipos Compartidos</h1>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "linear-gradient(90deg,#256dff 80%,#83e4ff 100%)",
              color: "#fff",
              border: "none",
              padding: "17px 38px",
              borderRadius: 18,
              fontSize: 22,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 3px 24px 0 rgba(36,138,226,0.15)",
              transition: "background 0.15s"
            }}
          >+ Añadir equipo</button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.3fr 1.3fr",
          gap: 44,
          alignItems: "flex-start"
        }}>
          {/* Listado de equipos */}
          <div>
            {equipos.length === 0 && <p style={{ opacity: 0.7, fontSize: 18 }}>Aún no hay equipos registrados.</p>}
            {equipos.map(e => (
              <div key={e.id} style={{
                background: "rgba(24,29,60,0.99)",
                borderRadius: 22,
                marginBottom: 22,
                padding: 28,
                boxShadow: "0 2px 24px 0 rgba(44,88,246,0.17)"
              }}>
                <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 6 }}>{e.nombre}</div>
                <div style={{ opacity: .8, marginBottom: 2 }}>Tipo: {e.tipo}</div>
                <div style={{ opacity: .8, marginBottom: 2 }}>Marca: {e.marca}</div>
                <div style={{ opacity: .8, marginBottom: 2 }}>Modelo: {e.modelo}</div>
                <div style={{ opacity: .8, marginBottom: 8 }}>Serial: {e.serial}</div>
                <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                  <button
                    onClick={() => setQrData(`http://localhost:5173/entrega?id=${e.serial}`)}
                    style={{
                      background: "#3153e6",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "9px 19px",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >Ver QR</button>
                  <button
                    onClick={() => printQR(e)}
                    style={{
                      background: "#27a9e1",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      padding: "9px 19px",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >Imprimir QR</button>
                </div>
              </div>
            ))}
          </div>
          {/* QR de equipo */}
          <div ref={qrCanvasRef} style={{
            background: "#212536",
            borderRadius: 18,
            boxShadow: "0 2px 18px 0 rgba(26,80,200,0.12)",
            padding: "30px 12px 24px 12px",
            textAlign: "center"
          }}>
            <h2 style={{ fontSize: 24, margin: "0 0 18px 0" }}>QR del equipo</h2>
            {qrData ? <QRCode value={qrData} size={210} /> : <p style={{ opacity: 0.8 }}>Selecciona un equipo para generar QR.</p>}
          </div>
          {/* Escanear QR */}
          <div style={{
            background: "#212536",
            borderRadius: 18,
            boxShadow: "0 2px 18px 0 rgba(26,80,200,0.12)",
            padding: "30px 12px 24px 12px",
            textAlign: "center"
          }}>
            <h2 style={{ fontSize: 24, margin: "0 0 18px 0" }}>Escanear código QR</h2>
            <div style={{
              width: 240,
              height: 240,
              background: "#111",
              borderRadius: 18,
              margin: "0 auto 10px auto",
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) window.location.href = result?.text; // Redirección automática
                }}
                constraints={{ facingMode: "environment" }}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginTop: 18, fontSize: 16, color: "#b3ebff" }}>
              Resultado: {scanned || "Esperando escaneo..."}
            </div>
          </div>
        </div>

        {showForm && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 30,
            width: "100vw",
            height: "100vh",
            background: "rgba(10,18,32,.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <form
              onSubmit={handleAdd}
              style={{
                background: "#232a3e",
                borderRadius: 22,
                padding: "40px 32px",
                minWidth: 360,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                boxShadow: "0 6px 36px 0 rgba(60,150,255,0.23)"
              }}>
              <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required style={inputStyle} />
              <select name="tipo" value={form.tipo} onChange={onChange} style={inputStyle}>
                <option value="energía">Energía</option>
                <option value="datos">Datos</option>
                <option value="otros">Otros</option>
              </select>
              <input name="marca" placeholder="Marca" value={form.marca} onChange={onChange} required style={inputStyle} />
              <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={onChange} required style={inputStyle} />
              <input name="serial" placeholder="Serial" value={form.serial} onChange={onChange} required style={inputStyle} />
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                height={220}
              />
              <button
                type="button"
                onClick={() => {
                  const imageSrc = webcamRef.current.getScreenshot();
                  setScreenshot(imageSrc);
                }}
                style={{ ...inputStyle, background: "#27a9e1", marginBottom: 12, color: "#fff" }}
              >Tomar Foto</button>
              {screenshot && <img src={screenshot} alt="Foto Herramienta" style={{ width: 90, marginBottom: 14 }} />}
              <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                <button type="submit" style={{ ...inputStyle, background: "#3066fa", color: "#fff" }}>Guardar</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ ...inputStyle, background: "#2d354b", color: "#fff" }}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}






