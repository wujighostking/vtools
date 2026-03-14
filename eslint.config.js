import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    formatters: true,
    pnpm: true,
    vue: true,
    typescript: true,
  },
  {
    rules: {
      'no-console': 'warn',
    },
  },
)
