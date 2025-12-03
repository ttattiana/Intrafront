import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Intrafront/', 
  plugins: [react()],
  
  // 🛑 NUEVA CONFIGURACIÓN PARA ACCESO POR RED 
  server: {
    // Escucha en 0.0.0.0 (todas las interfaces) o directamente en tu IP local
    // Usamos '0.0.0.0' para que el celular siempre se conecte a 192.168.0.58
    host: '0.0.0.0', 
    port: 5173,
    hmr: {
      // Necesario para indicar a tu celular la IP correcta (192.168.0.58)
      clientPort: 5173,
      host: '192.168.0.40' // 👈 Usa TU IP AQUÍ para la recarga en vivo (HMR)
    }
  }
})
