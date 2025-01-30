import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:3000', // Honoサーバーへのプロキシ
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
  ],
})
