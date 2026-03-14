# VTable 表格

基于 Element Plus `el-table` 封装的表格组件，支持配置化列定义和内置分页。

## 基础用法

```vue
<script setup lang="ts">
import type { ColumnConfig } from '@vtools/table'
import { VTable } from '@vtools/table'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱' },
]

const data = [
  { name: '张三', age: 18, email: 'zhangsan@example.com' },
  { name: '李四', age: 25, email: 'lisi@example.com' },
]
</script>

<template>
  <VTable :columns="columns" :data="data" />
</template>
```

## 隐藏分页

通过 `has-pagination` 属性控制是否显示分页器，默认显示。

```vue
<template>
  <VTable :columns="columns" :data="data" :has-pagination="false" />
</template>
```

## 分页事件

组件会触发 `sizeChange` 和 `currentChange` 事件，参数为 `PageQuery` 对象，可用于请求后端数据。

```vue
<script setup lang="ts">
import type { ColumnConfig, PageQuery } from '@vtools/table'
import { VTable } from '@vtools/table'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态' },
]

function handleSizeChange(query: PageQuery) {
  console.log('每页条数变更:', query.size)
  // 重新请求数据
}

function handleCurrentChange(query: PageQuery) {
  console.log('当前页变更:', query.current)
  // 重新请求数据
}
</script>

<template>
  <VTable
    :columns="columns"
    :data="[]"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
```

## 自定义列插槽

每列可通过以 `prop` 命名的插槽自定义渲染内容，插槽参数为 `scope`（同 Element Plus 的作用域插槽）。

```vue
<script setup lang="ts">
import type { ColumnConfig } from '@vtools/table'
import { VTable } from '@vtools/table'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态' },
  { prop: 'action', label: '操作', width: 200 },
]
</script>

<template>
  <VTable :columns="columns" :data="[]">
    <template #status="{ row }">
      <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
        {{ row.status === 'active' ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #action="{ row }">
      <el-button size="small" @click="handleEdit(row)">
        编辑
      </el-button>
      <el-button size="small" type="danger" @click="handleDelete(row)">
        删除
      </el-button>
    </template>
  </VTable>
</template>
```

## 透传列属性

`ColumnConfig` 支持传入任意 `el-table-column` 属性，如 `fixed`、`sortable`、`align` 等。

```vue
<script setup lang="ts">
import type { ColumnConfig } from '@vtools/table'

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

### ColumnConfig

| 属性    | 说明                              | 类型                                                        | 默认值 |
| ------- | --------------------------------- | ----------------------------------------------------------- | ------ |
| `prop`  | 列字段名，同时作为插槽名          | `string`                                                    | —      |
| `label` | 列标题                            | `string`                                                    | —      |
| `width` | 列宽度                            | `string \| number`                                          | —      |
| `slots` | 列的插槽配置                      | `Record<string, (scope: Record<string, unknown>) => VNode>` | —      |
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

| 插槽名   | 说明                                                    | 参数                             |
| -------- | ------------------------------------------------------- | -------------------------------- |
| `[prop]` | 以 `ColumnConfig.prop` 命名的具名插槽，用于自定义列内容 | `scope: { row, column, $index }` |

### 分页配置

内置分页默认配置：

- 可选每页条数：`[10, 20, 50, 100]`
- 布局：`total, sizes, prev, pager, next, jumper`
