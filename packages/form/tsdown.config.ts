import { defineConfig } from 'tsdown'
import { baseConfig } from '../../tsdown.config'

export default defineConfig({
  ...baseConfig,
  dts: { vue: true, tsconfig: '../../tsconfig.app.json' },
})
