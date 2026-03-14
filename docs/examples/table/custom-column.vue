<script setup lang="ts">
import type { ColumnConfig } from '@veltools/table'
import { VTable } from '@veltools/table'
import { ref } from 'vue'

const columns: ColumnConfig[] = [
  { prop: 'name', label: '姓名', width: '120' },
  { prop: 'status', label: '状态', width: '120' },
  { prop: 'action', label: '操作', width: '200' },
]

const tableData = ref([
  { name: '张三', status: 'active' },
  { name: '李四', status: 'inactive' },
  { name: '王五', status: 'active' },
])

function handleEdit(row: Record<string, unknown>) {
  console.log('编辑:', row) // eslint-disable-line no-console
}

function handleDelete(row: Record<string, unknown>) {
  console.log('删除:', row) // eslint-disable-line no-console
}
</script>

<template>
  <VTable :columns="columns" :data="tableData" :has-pagination="false">
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
