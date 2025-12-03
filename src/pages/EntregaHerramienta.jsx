import React, { useState, useRef } from "react"; // Añadido useRef
import { useSearchParams } from "react-router-dom";
import { API_BASE } from "../config";

// ESTE COMPONENTE UTILIZA LA ENTRADA DE ARCHIVO (INPUT FILE) PARA ACTIVAR LA CÁMARA

// Estilos base
const inputStyle = {
  background: "#232a3e",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  padding: "21px 20px",
  fontSize: "1.2rem", // Reducido ligeramente para más espacio
  marginBottom: "18px",
  width: "100%",
  outline: "none",
  boxSizing: 'border-box',
};

// --- DATOS DEL USUARIO SIMULADO (Obtenidos de la sesión/token) ---
// REEMPLAZAR con la lógica real de obtención de datos de sesión.
const USER_SESSION_DATA = {
    id: 5, // <-- ID real que Django espera
    nombre: "Juan",
    apellido: "Pérez García",
};
// -----------------------------------------------------------------

// --- COMPONENTE PRINCIPAL ---
export default function RegistroPréstamoForm() {
  const [params] = useSearchParams();
  // El ID/Serial de la herramienta viene de los parámetros de la URL después del escaneo QR
  const idHerramienta = params.get("id"); 
  
  // Referencia al input de archivo para poder activarlo con el botón
  const fileInputRef = useRef(null); 

  // --- ESTADO DE DATOS A ENVIAR ---
  const [formData, setFormData] = useState({ 
    // Campos del formulario
    ubicacion: "", 
    estado: "BUENO", // Default: Asume buen estado al prestar
    observaciones: "",

    // Campos del usuario (solo para mostrar/confirmación en el Frontend)
    nombre: USER_SESSION_DATA.nombre,
    apellido: USER_SESSION_DATA.apellido,
  });

  // --- ESTADO DE LA FOTO Y LA INTERFAZ ---
  const [photoFile, setPhotoFile] = useState(null); // El objeto File real a enviar
  const [photoUri, setPhotoUri] = useState(null); // URI local para previsualizar la foto
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Constantes de la API
  const USER_ID = USER_SESSION_DATA.id; // ID que se envía a Django
  const API_URL = `${API_BASE}/api/herramienta/uso/`;
 // <-- REEMPLAZAR con tu URL de Django

  const handleChange = e => {
    // Solo permitimos modificar los campos del formulario real (ubicacion, estado, observaciones)
    if (e.target.name !== 'nombre' && e.target.name !== 'apellido') {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // 1. Lógica para activar la cámara al hacer clic en el botón
  const handleCameraActivation = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click(); // Activa el input file oculto
    }
  };

  // 2. Lógica para capturar el archivo de imagen seleccionado por el usuario
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file); // Guarda el objeto File para el envío
      // Crea una URL temporal para previsualizar la imagen
      const tempUri = URL.createObjectURL(file); 
      setPhotoUri(tempUri);
      setStatusMessage("Foto capturada y lista para previsualizar.");
    } else {
      setPhotoFile(null);
      setPhotoUri(null);
      setStatusMessage("Captura de foto cancelada.");
    }
  };


  // 3. Lógica para enviar el registro (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // photoFile debe existir (el archivo real)
    if (!idHerramienta || !photoFile || !USER_ID) {
      setStatusMessage("ERROR: Faltan datos clave (Serial, Foto o ID de Usuario).");
      return;
    }
    
    setIsLoading(true);
    setStatusMessage("Enviando registro y foto a la base de datos...");

    // 1. Crear el objeto FormData (necesario para enviar archivos)
    const data = new FormData();
    data.append('herramienta', idHerramienta);
    data.append('usuario', USER_ID); // <-- ID del usuario logueado, CLAVE para Django
    data.append('ubicacion', formData.ubicacion); 
    data.append('estado', formData.estado); 
    data.append('observaciones', formData.observaciones); 

    // 2. Añadir el objeto File real al FormData
    // Django espera un archivo en el campo 'foto_evidencia'
    data.append('foto_evidencia', photoFile, photoFile.name); 


    // 3. Enviar la Solicitud POST
    try {
      console.log("API_URL =>", API_URL);
      const response = await fetch(API_URL, {
        method: 'POST',
        // NO se necesita Content-Type aquí, FormData lo maneja automáticamente
        // headers: { 'Authorization': 'Bearer YOUR_TOKEN' }, // Añadir autenticación si la usas
        body: data, 
      });

      if (response.ok) {
        setStatusMessage("✅ Registro guardado con éxito.");
        setPhotoFile(null);
        setPhotoUri(null);
        // Opcional: Redirigir al usuario o limpiar el formulario
      } else {
        const errorData = await response.json();
        console.error('Error al guardar:', errorData);
        setStatusMessage(`❌ Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setStatusMessage("⚠️ Error de conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
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
        justifyContent: "center",
        color: '#fafafa',
        backgroundColor: '#111827',
      }}
    >
      <h2 style={{
        fontSize: "2rem",
        textAlign: "center",
        marginBottom: 18,
        fontWeight: "bold",
        color: "#fafafa"
      }}>
        Registro préstamo de herramienta
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", alignItems: "center" }}>
        
        {/* Serial de la Herramienta (Automático) */}
        <div style={{ ...inputStyle, fontWeight: "bold", background: "#1a2440", color: "#87fff9", textAlign: 'center' }}>
            SERIAL HERRAMIENTA: {idHerramienta ?? "Pendiente de Escaneo"}
        </div>
        
        {/* Nombre del Usuario (Solo Lectura) */}
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          readOnly 
          style={{ ...inputStyle, background: "#1a2440", color: "#ddd" }}
        />
        {/* Apellido del Usuario (Solo Lectura) */}
        <input
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          readOnly 
          style={{ ...inputStyle, background: "#1a2440", color: "#ddd" }}
        />
        
        {/* Campo Ubicación */}
        <input
          name="ubicacion"
          placeholder="Ubicación de uso"
          value={formData.ubicacion}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Campo Estado de Préstamo */}
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
          style={{ ...inputStyle, appearance: 'none', padding: '21px 20px' }}
        >
          <option value="BUENO">Estado: Bueno</option>
          <option value="MALO">Estado: Malo (Registrar Daño)</option>
        </select>
        
        {/* Campo Observaciones */}
        <textarea
          name="observaciones"
          placeholder="Observaciones iniciales (opcional)"
          value={formData.observaciones}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: 100 }}
        />

        {/* --- SECCIÓN DE FOTO Y PREVISUALIZACIÓN --- */}
        <div style={{ width: '100%', margin: '18px 0', border: '1px solid #334155', borderRadius: 12, padding: 16 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 10, color: '#9ca3af' }}>
                Evidencia Fotográfica
            </h3>
            
            {/* Input de Archivo (Oculto) que activa la cámara en móvil */}
            <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />

            {!photoUri && (
                <button type="button" onClick={handleCameraActivation} style={{ ...inputStyle, background: "#87fff9", color: "#111827", fontWeight: "bold", marginBottom: 0 }}>
                    Tomar Foto de Evidencia
                </button>
            )}

            {photoUri && (
                <>
                    <img src={photoUri} alt="Previsualización de Evidencia" style={{ width: '100%', height: 'auto', borderRadius: 8, objectFit: 'cover', marginBottom: 10 }} />
                    <button type="button" onClick={handleCameraActivation} style={{ ...inputStyle, background: "#f59e0b", color: "#111827", fontWeight: "bold", padding: '10px 0', fontSize: '1rem', marginBottom: 0 }}>
                        Volver a Tomar Foto
                    </button>
                </>
            )}
        </div>

        {/* Botón de Registro (Guardar) */}
        <button
          type="submit"
          disabled={!idHerramienta || !photoUri || isLoading}
          style={{
            background: isLoading || !idHerramienta || !photoUri ? "#3264fe80" : "#3264fe",
            color: "#fff",
            padding: "18px 0",
            border: "none",
            borderRadius: 12,
            fontSize: "1.33rem",
            fontWeight: "bold",
            marginTop: "8px",
            width: "100%",
            cursor: (isLoading || !idHerramienta || !photoUri) ? 'not-allowed' : 'pointer'
          }}>
          {isLoading ? "Enviando..." : "Registrar Préstamo"}
        </button>
      </form>

      {/* Mensaje de Estado */}
      <div style={{ marginTop: 18, color: statusMessage.startsWith('✅') ? "lightgreen" : (statusMessage.startsWith('❌') ? "red" : "#ffcc00"), fontSize: "1.11rem", textAlign: "center" }}>
          {statusMessage}
      </div>
      
    </div>
  );
}


