import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VTools',
  description: 'Vue 组件工具库文档',
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
