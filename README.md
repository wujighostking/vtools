# VTools

配置驱动的 Vue 组件工具库，基于 Vue 3 + Element Plus，通过 JSON 配置快速生成表单与表格。

## 特性

- **配置化开发** — 通过 JSON 配置生成表单和表格，减少模板代码
- **灵活的插槽机制** — 支持配置插槽和模板插槽两种自定义方式
- **按需引入** — 统一导入 `veltools` 或按需引入 `@veltools/form`、`@veltools/table`
- **TypeScript** — 完整的类型定义，良好的 IDE 提示

## 安装

```bash
pnpm add veltools
```

确保已安装前置依赖：

```bash
pnpm add vue element-plus
```

## 使用

```ts
import type { ColumnConfig, FormItemConfig, PageQuery } from 'veltools'
import { VelForm, VelTable } from 'veltools'
```

### VelForm

```vue
<script setup lang="ts">
import type { FormItemConfig } from 'veltools'
import { ElInput } from 'element-plus'
import { VelForm } from 'veltools'
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '' })
const formItems: FormItemConfig[] = [
  { model: 'name', label: '姓名', type: ElInput, col: { span: 12 } },
  { model: 'email', label: '邮箱', type: ElInput, col: { span: 12 } },
]
const formRef = ref()
</script>

<template>
  <VelForm ref="formRef" :form-items="formItems" :form="form" />
</template>
```

### VelTable

```vue
<script setup lang="ts">
import type { ColumnConfig } from 'veltools'
import { VelTable } from 'veltools'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]
const data = [
  { name: '张三', email: 'zhangsan@example.com' },
  { name: '李四', email: 'lisi@example.com' },
]
</script>

<template>
  <VelTable :columns="columns" :data="data" />
</template>
```

## 包结构

| 包名              | 说明               |
| ----------------- | ------------------ |
| `veltools`        | 统一导出入口       |
| `@veltools/form`  | VelForm 表单构建器 |
| `@veltools/table` | VelTable 表格组件  |

## 开发

```bash
# 安装依赖
pnpm install

# 启动 playground
pnpm dev:playground

# 启动文档
pnpm dev:docs

# 构建所有包
pnpm build
```

## License

MIT
