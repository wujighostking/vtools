import { defineConfig } from 'tsdown'
import { baseConfig } from '../../tsdown.config'

export default defineConfig({
  ...baseConfig,
  dts: { tsconfig: '../../tsconfig.app.json' },
})
