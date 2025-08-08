import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // Copy CSS file to dist
  onSuccess: 'cp src/styles.css dist/',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})
