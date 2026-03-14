<script setup lang="ts">
import type { ColumnConfig } from '@veltools/table'
import { VelTable } from '@veltools/table'
import { ElTag } from 'element-plus'
import { h, ref } from 'vue'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名', width: 120 },
  {
    prop: 'status',
    label: '状态',
    width: 120,
    slots: {
      default: (scope: Record<string, any>) =>
        h(ElTag, { type: scope.row.status === 'active' ? 'success' : 'danger' }, () =>
          scope.row.status === 'active' ? '启用' : '禁用'),
    },
  },
  { prop: 'email', label: '邮箱' },
]

const tableData = ref([
  { name: '张三', status: 'active', email: 'zhangsan@example.com' },
  { name: '李四', status: 'inactive', email: 'lisi@example.com' },
  { name: '王五', status: 'active', email: 'wangwu@example.com' },
])
</script>

<template>
  <VelTable :columns="columns" :data="tableData" :has-pagination="false" />
</template>
