import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@veltools/form': fileURLToPath(new URL('../packages/form/src/index.ts', import.meta.url)),
      '@veltools/table': fileURLToPath(new URL('../packages/table/src/index.ts', import.meta.url)),
      'veltools': fileURLToPath(new URL('../packages/main/src/index.ts', import.meta.url)),
    },
  },
})
