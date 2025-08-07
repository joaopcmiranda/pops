import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/http-client.ts',
    'src/trip-client.ts',
    'src/itinerary-client.ts',
    'src/content-client.ts',
    'src/user-client.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: ['@pops/types', 'zod'],
})
