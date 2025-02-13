import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // HTTPS を強制しない
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html'),
        api: resolve(__dirname, 'src/api/index.ts'),
      },
      output: {
        // API 用のエントリーポイントは /api フォルダへ、それ以外は assets/ に出力
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'api') {
            return 'api/[name].js'
          }
          return 'assets/[name]-[hash].js'
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
  ],
})
