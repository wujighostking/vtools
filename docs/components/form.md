<script setup>
import BasicDemo from '../examples/form/basic.vue'
import SlotsConfigDemo from '../examples/form/slots-config.vue'
import SlotsTemplateDemo from '../examples/form/slots-template.vue'
</script>

# FormBuilder 表单构建器

基于 Element Plus `el-form` 封装的动态表单组件，通过配置化方式快速生成表单。

## 基础用法

通过 `formItems` 配置表单项，`form` 传入响应式数据对象，`rowProps` 控制栅格布局。

<ClientOnly><BasicDemo /></ClientOnly>

::: details 查看代码
<<< ../examples/form/basic.vue
:::

## 配置插槽

通过 `FormItemConfig.slots` 向组件内部传递渲染函数插槽，如给 `el-select` 传入选项、给 `el-input` 添加前缀等。

<ClientOnly><SlotsConfigDemo /></ClientOnly>

::: details 查看代码
<<< ../examples/form/slots-config.vue
:::

## 模板插槽

每个表单项可通过以 `model` 名称命名的插槽完全自定义渲染。

<ClientOnly><SlotsTemplateDemo /></ClientOnly>

::: details 查看代码
<<< ../examples/form/slots-template.vue
:::

## 调用表单方法

组件通过 `ref` 暴露了以下方法：

```vue
<script setup lang="ts">
import { FormBuilder } from '@vtools/form'
import { ref } from 'vue'

const formRef = ref()

async function handleSubmit() {
  // 表单验证
  await formRef.value.validate()

  // 获取表单数据
  const data = formRef.value.formData()
  console.log(data)
}

function getFormInstance() {
  // 获取 el-form 实例，可调用 Element Plus 表单的所有方法
  const instance = formRef.value.formInstance()
  instance.resetFields()
}
</script>

<template>
  <FormBuilder ref="formRef" :form-items="[]" />
  <el-button @click="handleSubmit">
    提交
  </el-button>
</template>
```

## API

### Props

| 属性        | 说明                   | 类型                      | 默认值   |
| ----------- | ---------------------- | ------------------------- | -------- |
| `formItems` | 表单项配置数组         | `FormItemConfig[]`        | — (必填) |
| `form`      | 表单数据对象           | `Record<string, unknown>` | `{}`     |
| `rowProps`  | 传递给 `el-row` 的属性 | `RowProps`                | —        |

### FormItemConfig

| 属性    | 说明                        | 类型                          | 默认值   |
| ------- | --------------------------- | ----------------------------- | -------- |
| `model` | 字段名，同时作为插槽名      | `string`                      | — (必填) |
| `label` | 标签文本                    | `string`                      | —        |
| `type`  | 组件类型，字符串或 Vue 组件 | `string \| Component`         | —        |
| `col`   | `el-col` 的属性配置         | `Record<string, unknown>`     | —        |
| `props` | 传递给表单组件的属性        | `Record<string, unknown>`     | —        |
| `slots` | 传递给表单组件的插槽        | `Record<string, () => VNode>` | —        |

### Expose 方法

| 方法           | 说明                               | 类型                              |
| -------------- | ---------------------------------- | --------------------------------- |
| `validate`     | 表单验证，同 `el-form` 的 validate | `(...args: unknown[]) => Promise` |
| `formData`     | 获取当前表单数据                   | `() => Record<string, unknown>`   |
| `formInstance` | 获取 `el-form` 实例                | `() => FormInstance`              |

### Slots

| 插槽名    | 说明                                                             |
| --------- | ---------------------------------------------------------------- |
| `[model]` | 以 `FormItemConfig.model` 命名的具名插槽，用于自定义该表单项内容 |
