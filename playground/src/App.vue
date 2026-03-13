<script setup lang="ts">
import type { FormItemConfig } from '@vtools/form'
import type { ColumnConfig, PageQuery } from '@vtools/table'
import { FormBuilder } from '@vtools/form'
import { VTable } from '@vtools/table'
import { ElInput, ElOption, ElSelect } from 'element-plus'
import { reactive, ref } from 'vue'

// ========== Form Demo ==========
const formData = reactive({
  name: '',
  email: '',
  role: '',
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
  {
    model: 'role',
    label: '角色',
    type: ElSelect,
    col: { span: 12 },
    props: { placeholder: '请选择角色' },
  },
]

const formRef = ref<InstanceType<typeof FormBuilder>>()

function handleSubmit() {
  // eslint-disable-next-line no-console
  console.log('表单数据:', formRef.value?.formData())
}

// ========== Table Demo ==========
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
  // eslint-disable-next-line no-console
  console.log('分页大小变更:', query)
}

function handleCurrentChange(query: PageQuery) {
  // eslint-disable-next-line no-console
  console.log('当前页变更:', query)
}
</script>

<template>
  <div style="padding: 24px; max-width: 960px; margin: 0 auto;">
    <h1>vtools playground</h1>

    <ElDivider>FormBuilder</ElDivider>
    <FormBuilder
      ref="formRef"
      :form-items="formItems"
      :form="formData"
      :row-props="{ gutter: 16 }"
      label-width="80px"
    >
      <template #role>
        <ElFormItem label="角色" prop="role">
          <ElSelect v-model="formData.role" placeholder="请选择角色">
            <ElOption label="管理员" value="admin" />
            <ElOption label="编辑" value="editor" />
            <ElOption label="用户" value="user" />
          </ElSelect>
        </ElFormItem>
      </template>
    </FormBuilder>
    <ElButton type="primary" style="margin-top: 12px;" @click="handleSubmit">
      提交
    </ElButton>

    <ElDivider>VTable</ElDivider>
    <VTable
      :columns="columns"
      :data="tableData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
