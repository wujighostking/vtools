# FormBuilder 表单构建器

基于 Element Plus `el-form` 封装的动态表单组件，通过配置化方式快速生成表单。

## 基础用法

```vue
<script setup lang="ts">
import type { FormItemConfig } from '@vtools/form'
import { FormBuilder } from '@vtools/form'
import { ref } from 'vue'

const formItems: FormItemConfig[] = [
  { model: 'name', label: '姓名' },
  { model: 'email', label: '邮箱' },
]

const formRef = ref()
</script>

<template>
  <FormBuilder ref="formRef" :form-items="formItems" />
</template>
```

## 自定义表单数据

通过 `form` 属性传入外部表单数据对象，实现受控模式。如不传入，组件内部会自动维护一个空对象。

```vue
<script setup lang="ts">
import type { FormItemConfig } from '@vtools/form'
import { FormBuilder } from '@vtools/form'
import { reactive } from 'vue'

const form = reactive({
  name: '张三',
  age: 18,
})

const formItems: FormItemConfig[] = [
  { model: 'name', label: '姓名' },
  { model: 'age', label: '年龄' },
]
</script>

<template>
  <FormBuilder :form-items="formItems" :form="form" />
</template>
```

## 自定义组件类型

`type` 属性支持传入字符串（对应 Element Plus 内置组件名）或自定义 Vue 组件。

```vue
<script setup lang="ts">
import type { FormItemConfig } from '@vtools/form'
import { FormBuilder } from '@vtools/form'
import CustomInput from './CustomInput.vue'

const formItems: FormItemConfig[] = [
  { model: 'name', label: '姓名', type: 'el-input' },
  { model: 'gender', label: '性别', type: 'el-select' },
  { model: 'custom', label: '自定义', type: CustomInput },
]
</script>

<template>
  <FormBuilder :form-items="formItems" />
</template>
```

## 栅格布局

通过 `col` 属性控制每个表单项的栅格列配置，`rowProps` 属性传递给 `el-row`。

```vue
<script setup lang="ts">
import type { FormItemConfig } from '@vtools/form'
import { FormBuilder } from '@vtools/form'

const formItems: FormItemConfig[] = [
  { model: 'name', label: '姓名', col: { span: 12 } },
  { model: 'email', label: '邮箱', col: { span: 12 } },
  { model: 'address', label: '地址', col: { span: 24 } },
]
</script>

<template>
  <FormBuilder :form-items="formItems" :row-props="{ gutter: 20 }" />
</template>
```

## 自定义插槽

每个表单项可通过以 `model` 名称命名的插槽进行自定义渲染。

```vue
<script setup lang="ts">
import type { FormItemConfig } from '@vtools/form'
import { FormBuilder } from '@vtools/form'

const formItems: FormItemConfig[] = [
  { model: 'name', label: '姓名' },
  { model: 'action', label: '操作' },
]
</script>

<template>
  <FormBuilder :form-items="formItems">
    <template #action>
      <el-button type="primary">
        提交
      </el-button>
      <el-button>重置</el-button>
    </template>
  </FormBuilder>
</template>
```

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
