import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

const settings = {
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
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
  ],
};

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    return {
      server: settings.server,
      plugins: settings.plugins,
    };
  } else {
    return {
      plugins: settings.plugins,
    };
  }
});
