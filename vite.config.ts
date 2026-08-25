import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
  build: {
    outDir: 'public',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    allowedHosts: ['cc52-2a09-bac5-37ae-1f19-00-319-84.ngrok-free.app'],
    proxy: {
      '/api': {
        target: 'http://localhost:5209',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:5209',
        changeOrigin: true,
      },
    },
  },
});
