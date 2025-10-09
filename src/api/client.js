import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json", // Necesario para que Django entienda los datos JSON
  },
  withCredentials: true, // (Opcional) si usas sesiones, cookies, etc.
});
