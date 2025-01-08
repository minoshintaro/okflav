import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    // バックエンドをプロキシ設定
    proxy: {
      '/api': 'http://localhost:3000', // バックエンドAPIをプロキシ
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
