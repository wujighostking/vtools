import type { UserConfig } from 'tsdown'

export const baseConfig: UserConfig = {
  platform: 'neutral',
  format: 'esm',
  dts: { build: true },
  clean: true,
  entry: 'src/index.ts',
  outDir: 'dist',
}
