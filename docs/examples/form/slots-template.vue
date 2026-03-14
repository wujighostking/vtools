<script setup lang="ts">
import type { FormItemConfig } from '@veltools/form'
import { FormBuilder } from '@veltools/form'
import { ElInput } from 'element-plus'
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  remark: '',
})

const formItems: FormItemConfig[] = [
  {
    model: 'name',
    label: '姓名',
    type: ElInput,
    col: { span: 24 },
    props: { placeholder: '请输入姓名' },
  },
  {
    model: 'remark',
    label: '备注',
    col: { span: 24 },
  },
]
</script>

<template>
  <FormBuilder
    :form-items="formItems"
    :form="formData"
    :row-props="{ gutter: 16 }"
    label-width="80px"
  >
    <template #remark>
      <el-form-item label="备注" prop="remark">
        <ElInput
          v-model="formData.remark"
          type="textarea"
          :rows="3"
          placeholder="这是通过模板插槽自定义的表单项"
        />
      </el-form-item>
    </template>
  </FormBuilder>
</template>
