<script setup>
import BasicDemo from '../examples/table/basic.vue'
import CustomColumnDemo from '../examples/table/custom-column.vue'
import TemplateSlotDemo from '../examples/table/template-slot.vue'
</script>

# VelTable 表格

基于 Element Plus `el-table` 封装的配置驱动表格组件，支持配置化列定义、自定义列渲染和内置分页。

## 基础用法

通过 `columns` 定义列配置，`data` 传入表格数据。组件默认启用分页，通过 `sizeChange` 和 `currentChange` 事件获取分页参数。

<ClientOnly><BasicDemo /></ClientOnly>

::: details 查看代码
<<< ../examples/table/basic.vue
:::

## 配置插槽

通过 `ColumnConfig.slots` 传入渲染函数，在列内部自定义单元格内容。插槽名对应 `el-table-column` 的插槽（如 `default`、`header`），渲染函数接收 `el-table-column` 的作用域参数。

<ClientOnly><CustomColumnDemo /></ClientOnly>

::: details 查看代码
<<< ../examples/table/custom-column.vue
:::

## 模板插槽

通过以 `column.prop` 命名的具名插槽自定义单元格内容，插槽参数与 `el-table-column` 的作用域插槽一致（`row`、`column`、`$index`）。

<ClientOnly><TemplateSlotDemo /></ClientOnly>

::: details 查看代码
<<< ../examples/table/template-slot.vue
:::

## 隐藏分页

通过 `has-pagination` 属性控制是否显示分页器，默认显示。

```vue
<template>
  <VelTable :columns="columns" :data="data" :has-pagination="false" />
</template>
```

## 透传属性

组件通过 `v-bind="$attrs"` 将未声明的属性透传给 `el-table`，可直接使用 `el-table` 的所有属性。

```vue
<template>
  <VelTable
    :columns="columns"
    :data="data"
    border
    :height="400"
    :default-sort="{ prop: 'date', order: 'descending' }"
  />
</template>
```

## 透传列属性

`ColumnConfig` 支持传入任意 `el-table-column` 属性，如 `fixed`、`sortable`、`align` 等。

```vue
<script setup lang="ts">
import type { ColumnConfig } from '@veltools/table'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名', fixed: 'left' },
  { prop: 'age', label: '年龄', sortable: true, align: 'center' },
  { prop: 'action', label: '操作', fixed: 'right', width: 150 },
]
</script>
```

## API

### Props

| 属性            | 说明         | 类型                        | 默认值 |
| --------------- | ------------ | --------------------------- | ------ |
| `columns`       | 列配置数组   | `ColumnConfig[]`            | `[]`   |
| `data`          | 表格数据     | `Record<string, unknown>[]` | `[]`   |
| `hasPagination` | 是否显示分页 | `boolean`                   | `true` |

组件支持透传 `el-table` 的所有属性（如 `border`、`height`、`stripe` 等）。

### ColumnConfig

| 属性    | 说明                              | 类型                                                        | 默认值 |
| ------- | --------------------------------- | ----------------------------------------------------------- | ------ |
| `prop`  | 列字段名，同时作为模板插槽名      | `string`                                                    | —      |
| `label` | 列标题                            | `string`                                                    | —      |
| `width` | 列宽度                            | `string \| number`                                          | —      |
| `slots` | 列的渲染函数插槽                  | `Record<string, (scope: Record<string, unknown>) => VNode>` | —      |
| `[key]` | 其他 `el-table-column` 支持的属性 | `unknown`                                                   | —      |

### PageQuery

| 属性      | 说明     | 类型     | 默认值 |
| --------- | -------- | -------- | ------ |
| `current` | 当前页码 | `number` | `1`    |
| `pages`   | 总页数   | `number` | `1`    |
| `size`    | 每页条数 | `number` | `10`   |
| `total`   | 总数据量 | `number` | `0`    |

### Events

| 事件名          | 说明               | 参数                 |
| --------------- | ------------------ | -------------------- |
| `sizeChange`    | 每页条数变化时触发 | `(query: PageQuery)` |
| `currentChange` | 当前页变化时触发   | `(query: PageQuery)` |

### Slots

| 插槽名   | 说明                                                          | 用法                             |
| -------- | ------------------------------------------------------------- | -------------------------------- |
| `[prop]` | 以 `ColumnConfig.prop` 命名的具名插槽，自定义该列的单元格内容 | `scope: { row, column, $index }` |

### 分页配置

内置分页默认配置：

- 可选每页条数：`[10, 20, 50, 100]`
- 布局：`total, sizes, prev, pager, next, jumper`
