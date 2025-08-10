import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    database: 'src/database.ts',
    fastify: 'src/fastify.ts',
    fixtures: 'src/fixtures.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
})
