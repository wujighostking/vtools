import type { UserConfig } from 'tsdown'
import vue from '@vitejs/plugin-vue'

export const baseConfig: UserConfig = {
  platform: 'neutral',
  format: 'esm',
  dts: { vue: true },
  clean: true,
  entry: 'src/index.ts',
  outDir: 'dist',
  plugins: [vue()],
}
