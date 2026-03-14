# 组件总览

VelTools 提供以下组件，所有组件和类型均可从 `veltools` 统一导入：

```ts
import type { ColumnConfig, FormItemConfig, PageQuery } from 'veltools'
import { VelForm, VelTable } from 'veltools'
```

## VelForm 表单构建器

| 导出             | 类型 | 说明                 |
| ---------------- | ---- | -------------------- |
| `VelForm`        | 组件 | 配置化动态表单构建器 |
| `FormItemConfig` | 类型 | 表单项配置接口       |

[查看详细文档 →](./form)

## VelTable 表格

| 导出           | 类型 | 说明                 |
| -------------- | ---- | -------------------- |
| `VelTable`     | 组件 | 配置化表格，内置分页 |
| `ColumnConfig` | 类型 | 列配置接口           |
| `PageQuery`    | 类型 | 分页查询参数接口     |

[查看详细文档 →](./table)
