<script setup lang="ts">
import type { FormItemConfig } from '@veltools/form'
import { VelForm } from '@veltools/form'
import { ElInput } from 'element-plus'
import { reactive, ref } from 'vue'

const formData = reactive({
  name: '',
  email: '',
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
]

const formRef = ref<InstanceType<typeof VelForm>>()

function handleSubmit() {
  console.log('表单数据:', formRef.value?.formData()) // eslint-disable-line no-console
}
</script>

<template>
  <VelForm
    ref="formRef"
    :form-items="formItems"
    :form="formData"
    :row-props="{ gutter: 16 }"
    label-width="80px"
  />
  <el-button type="primary" style="margin-top: 12px;" @click="handleSubmit">
    提交
  </el-button>
</template>
