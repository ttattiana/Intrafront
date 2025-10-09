import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Intrafront/', // 👈 coloca el nombre exacto de tu repositorio aquí
  plugins: [react()],
})
