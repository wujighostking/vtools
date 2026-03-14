import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VTools',
  description: 'Vue 组件工具库文档',
  vite: {
    resolve: {
      alias: {
        '@vtools/form': fileURLToPath(new URL('../../packages/form/src/index.ts', import.meta.url)),
        '@vtools/table': fileURLToPath(new URL('../../packages/table/src/index.ts', import.meta.url)),
        'vtools': fileURLToPath(new URL('../../packages/main/src/index.ts', import.meta.url)),
      },
    },
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Table 表格', link: '/components/table' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],
  },
})
