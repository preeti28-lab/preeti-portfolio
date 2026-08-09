import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    // Absolute imports: `import Button from '@/components/ui/Button'`
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },

  server: {
    port: 5173,
    open: true,
    // Proxy the contact-form API to the optional Express backend so the
    // frontend can call `/api/contact` in dev without CORS headaches.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    // Split heavy vendors into their own chunks -> better long-term caching
    // and a smaller initial bundle.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
