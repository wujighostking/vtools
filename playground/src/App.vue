<script setup lang="ts">
import type { FormItemConfig } from '@veltools/form'
import type { ColumnConfig, PageQuery } from '@veltools/table'
import { VelForm } from '@veltools/form'
import { VelTable } from '@veltools/table'
import { ElInput, ElOption, ElSelect, ElTag } from 'element-plus'
import { h, reactive, ref } from 'vue'

// ========== Form Demo ==========
const formData = reactive({
  name: '',
  email: '',
  role: '',
  status: '',
  remark: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'name',
    label: '姓名',
    type: ElInput,
    col: { span: 12 },
    props: { placeholder: '请输入姓名' },
  },
  {
    model: 'email',
    label: '邮箱',
    type: ElInput,
    col: { span: 12 },
    props: { placeholder: '请输入邮箱' },
  },
  // slots 配置方式：通过 FormItemConfig.slots 向组件内部传递插槽
  {
    model: 'role',
    label: '角色',
    type: ElSelect,
    col: { span: 12 },
    props: { placeholder: '请选择角色' },
    slots: {
      default: () => h('div', [
        h(ElOption, { label: '管理员', value: 'admin' }),
        h(ElOption, { label: '编辑', value: 'editor' }),
        h(ElOption, { label: '用户', value: 'user' }),
      ]),
    },
  },
  // slots 配置方式：el-input 的 prefix / suffix 插槽
  {
    model: 'status',
    label: '状态',
    type: ElInput,
    col: { span: 12 },
    props: { placeholder: '请输入状态' },
    slots: {
      prefix: () => h(ElTag, { size: 'small', type: 'success' }, () => '标签'),
    },
  },
  // 模板插槽方式：通过 <template #remark> 完全自定义
  {
    model: 'remark',
    label: '备注',
    col: { span: 24 },
  },
]

const formRef = ref<InstanceType<typeof VelForm>>()

function handleSubmit() {
  // eslint-disable-next-line no-console
  console.log('表单数据:', formRef.value?.formData())
}

// ========== Table Demo: 基础用法 ==========
const basicColumns: ColumnConfig[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱' },
  { prop: 'role', label: '角色', width: 100 },
]

const basicTableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户' },
])

function handleSizeChange(query: PageQuery) {
  // eslint-disable-next-line no-console
  console.log('每页条数变更:', query)
}

function handleCurrentChange(query: PageQuery) {
  // eslint-disable-next-line no-console
  console.log('当前页变更:', query)
}

// ========== Table Demo: 配置插槽 ==========
const configSlotColumns: ColumnConfig[] = [
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

const configSlotTableData = ref([
  { name: '张三', status: 'active', email: 'zhangsan@example.com' },
  { name: '李四', status: 'inactive', email: 'lisi@example.com' },
  { name: '王五', status: 'active', email: 'wangwu@example.com' },
])

// ========== Table Demo: 模板插槽 ==========
const templateSlotColumns: ColumnConfig[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'status', label: '状态', width: 120 },
  { prop: 'action', label: '操作', width: 200 },
]

const templateSlotTableData = ref([
  { name: '张三', status: 'active' },
  { name: '李四', status: 'inactive' },
  { name: '王五', status: 'active' },
])

function handleEdit(row: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log('编辑:', row)
}

function handleDelete(row: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log('删除:', row)
}
</script>

<template>
  <div style="padding: 24px; max-width: 960px; margin: 0 auto;">
    <h1>vtools playground</h1>

    <ElDivider>VelForm</ElDivider>
    <VelForm
      ref="formRef"
      :form-items="formItems"
      :form="formData"
      :row-props="{ gutter: 16 }"
      label-width="80px"
    >
      <!-- 模板插槽：完全自定义该表单项的渲染 -->
      <template #remark>
        <ElFormItem label="备注" prop="remark">
          <ElInput
            v-model="formData.remark"
            type="textarea"
            :rows="3"
            placeholder="这是通过模板插槽自定义的表单项"
          />
        </ElFormItem>
      </template>
    </VelForm>
    <ElButton type="primary" style="margin-top: 12px;" @click="handleSubmit">
      提交
    </ElButton>

    <ElDivider>VelTable - 基础用法</ElDivider>
    <VelTable
      :columns="basicColumns"
      :data="basicTableData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <ElDivider>VelTable - 配置插槽</ElDivider>
    <VelTable
      :columns="configSlotColumns"
      :data="configSlotTableData"
      :has-pagination="false"
    />

    <ElDivider>VelTable - 模板插槽</ElDivider>
    <VelTable
      :columns="templateSlotColumns"
      :data="templateSlotTableData"
      :has-pagination="false"
    >
      <template #status="{ row }">
        <ElTag :type="row.status === 'active' ? 'success' : 'danger'">
          {{ row.status === 'active' ? '启用' : '禁用' }}
        </ElTag>
      </template>
      <template #action="{ row }">
        <ElButton size="small" @click="handleEdit(row)">
          编辑
        </ElButton>
        <ElButton size="small" type="danger" @click="handleDelete(row)">
          删除
        </ElButton>
      </template>
    </VelTable>
  </div>
</template>
