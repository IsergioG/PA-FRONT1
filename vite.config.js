import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 10000, // Cambia este número al puerto que desees
  },
  plugins: [react()],
})
