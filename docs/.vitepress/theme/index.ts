import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'

import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  },
}
