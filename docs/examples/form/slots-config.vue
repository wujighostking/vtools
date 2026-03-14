<script setup lang="ts">
import type { FormItemConfig } from '@veltools/form'
import { FormBuilder } from '@veltools/form'
import { ElInput, ElOption, ElSelect, ElTag } from 'element-plus'
import { h, reactive } from 'vue'

const formData = reactive({
  role: '',
  status: '',
})

const formItems: FormItemConfig[] = [
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
]
</script>

<template>
  <FormBuilder
    :form-items="formItems"
    :form="formData"
    :row-props="{ gutter: 16 }"
    label-width="80px"
  />
</template>
