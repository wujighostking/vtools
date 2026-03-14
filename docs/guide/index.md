# 快速开始

## 安装

```bash
# 安装完整包（推荐）
pnpm add veltools

# 或按需安装单个包
pnpm add @veltools/form
pnpm add @veltools/table
```

### 前置依赖

VTools 基于 [Vue 3](https://vuejs.org/) 和 [Element Plus](https://element-plus.org/) 构建，请确保项目中已安装：

```bash
pnpm add vue element-plus
```

## 引入组件

```ts
// 或从子包按需引入
import { VelForm } from '@veltools/form'

import { VelTable } from '@veltools/table'
// 从统一入口引入（推荐）
import { VelForm, VelTable } from 'veltools'
```

## 引入类型

```ts
// 或从子包按需引入
import type { FormItemConfig } from '@veltools/form'

import type { ColumnConfig, PageQuery } from '@veltools/table'
// 从统一入口引入（推荐）
import type { ColumnConfig, FormItemConfig, PageQuery } from 'veltools'
```
