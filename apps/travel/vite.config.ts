import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4003,
    strictPort: true,
  },
  preview: {
    port: 4003,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pops/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@pops/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@pops/types': path.resolve(__dirname, '../../packages/types/src'),
      '@pops/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
})
