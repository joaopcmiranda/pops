import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    // Use a custom tsconfig for DTS generation to avoid rootDir issues
    compilerOptions: {
      skipLibCheck: true,
      moduleResolution: 'node',
    },
  },
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions: options => {
    options.banner = {
      js: '"use client"',
    }
  },
})
