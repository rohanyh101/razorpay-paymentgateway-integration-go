import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/create-order': 'http://localhost:8081',
      '/get-key': 'http://localhost:8081',
      '/payment-callback': 'http://localhost:8081',
    },
  },
})
