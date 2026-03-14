<script setup lang="ts">
import type { ColumnConfig, PageQuery } from '@vtools/table'
import { VTable } from '@vtools/table'
import { ref } from 'vue'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名', width: '120' },
  { prop: 'email', label: '邮箱' },
  { prop: 'role', label: '角色', width: '120' },
]

const tableData = ref([
  { name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { name: '李四', email: 'lisi@example.com', role: '编辑' },
  { name: '王五', email: 'wangwu@example.com', role: '用户' },
])

function handleSizeChange(query: PageQuery) {
  console.log('分页大小变更:', query) // eslint-disable-line no-console
}

function handleCurrentChange(query: PageQuery) {
  console.log('当前页变更:', query) // eslint-disable-line no-console
}
</script>

<template>
  <VTable
    :columns="columns"
    :data="tableData"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
