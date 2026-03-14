# 快速开始

## 安装

```bash
# 安装完整包（推荐）
pnpm add vtools

# 或按需安装单个包
pnpm add @vtools/form
pnpm add @vtools/table
```

### 前置依赖

VTools 基于 [Vue 3](https://vuejs.org/) 和 [Element Plus](https://element-plus.org/) 构建，请确保项目中已安装：

```bash
pnpm add vue element-plus
```

## 引入组件

```ts
// 或从子包按需引入
import { FormBuilder } from '@vtools/form'

import { VTable } from '@vtools/table'
// 从统一入口引入（推荐）
import { FormBuilder, VTable } from 'vtools'
```

## 引入类型

```ts
// 或从子包按需引入
import type { FormItemConfig } from '@vtools/form'

import type { ColumnConfig, PageQuery } from '@vtools/table'
// 从统一入口引入（推荐）
import type { ColumnConfig, FormItemConfig, PageQuery } from 'vtools'
```
