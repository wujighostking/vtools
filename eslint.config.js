import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    formatters: true,
    pnpm: true,
    vue: true,
    typescript: true,
    ignores: ['docs'],
  },
  {
    rules: {
      'no-console': 'warn',
    },
  },
)
