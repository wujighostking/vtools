import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vtools/form': fileURLToPath(new URL('../packages/form/src/index.ts', import.meta.url)),
      '@vtools/table': fileURLToPath(new URL('../packages/table/src/index.ts', import.meta.url)),
      'vtools': fileURLToPath(new URL('../packages/main/src/index.ts', import.meta.url)),
    },
  },
})
