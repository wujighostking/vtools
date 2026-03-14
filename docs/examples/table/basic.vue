<script setup lang="ts">
import type { ColumnConfig, PageQuery } from '@veltools/table'
import { VelTable } from '@veltools/table'
import { ref } from 'vue'

const columns: ColumnConfig[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱' },
  { prop: 'role', label: '角色', width: 100 },
]

const tableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户' },
])

function handleSizeChange(query: PageQuery) {
  console.log('每页条数变更:', query)
}

function handleCurrentChange(query: PageQuery) {
  console.log('当前页变更:', query)
}
</script>

<template>
  <VelTable
    :columns="columns"
    :data="tableData"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
