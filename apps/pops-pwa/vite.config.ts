import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5566,
    strictPort: true,
    host: true,
    hmr: {
      port: 5566,
      host: "localhost",
    },
    proxy: {
      "/trpc": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // Don't rewrite — tRPC expects /trpc prefix
      },
    },
  },
});
