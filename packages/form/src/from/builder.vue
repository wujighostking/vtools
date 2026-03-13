<script setup lang="ts">
import type { FormInstance, RowProps } from 'element-plus'
import type { Component, VNode } from 'vue'
import { ref, useTemplateRef } from 'vue'

export interface FormItemConfig {
  model: string
  label?: string
  type?: string | Component
  col?: Record<string, unknown>
  props?: Record<string, unknown>
  slots?: Record<string, () => VNode>
}

const props = defineProps<{
  formItems: FormItemConfig[]
  form?: Record<string, unknown>
  /** el-row 组件的属性 */
  rowProps?: RowProps
}>()

const form = ref<Record<string, unknown>>({})

const formRef = useTemplateRef<FormInstance>('formInstance')

defineExpose({
  validate: (...args: unknown[]) => formRef.value?.validate?.(...(args as [])),
  formData: () => props.form ?? form.value,
  formInstance: () => formRef.value,
})
</script>

<template>
  <el-form ref="formInstance" :model="props.form ?? form" class="addr-form" v-bind="$attrs">
    <el-row v-bind="props.rowProps">
      <template v-for="item in props.formItems" :key="item.model">
        <el-col v-bind="item.col">
          <slot :name="item.model">
            <el-form-item :label="item.label" :prop="item.model">
              <component
                :is="item.type"
                v-model="(props.form ?? form)[item.model]"
                v-bind="item.props"
              >
                <template
                  v-for="(slotContent, slotName) in item.slots"
                  :key="slotName"
                  #[slotName]
                >
                  <component :is="slotContent" />
                </template>
              </component>
            </el-form-item>
          </slot>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style scoped></style>
