import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    proxy:{
      // Target is your backend API
      '/api': {
        target: '"https://couple-board.vercel.app"', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        
        configure: (proxy, options) => {
           proxy.on('error', (err, _req, _res) => {
            console.log('error', err);
           });
           proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Request sent to target:', req.method, req.url);
           });
           proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Response received from target:', proxyRes.statusCode, req.url);
           });
     },
  },
    }
  }
})
