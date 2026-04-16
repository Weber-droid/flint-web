import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      // Proxy the marketing root and all .html pages to the backend static server
      '^/$': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '^/.+\\.html$': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      // Marketing assets
      '^/logo\\.svg$': { target: 'http://localhost:3001', changeOrigin: true },
      '^/icon\\.(png|svg)$': { target: 'http://localhost:3001', changeOrigin: true }
    }
  }
})
