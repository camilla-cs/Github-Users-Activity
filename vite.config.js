import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,     // Change dev server port
    open: true,     // Auto-open browser
  },
})