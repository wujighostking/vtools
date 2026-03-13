<script setup>
import { h, ref, useTemplateRef } from 'vue';

const props = defineProps({
  formItems: {
    type: Array,
    required: true,
  },
  form: {
    type: Object,
  },
  /**
   * el-row 组件的属性
   * @param {RowProps} rowProps
   */
  rowProps: {
    type: Object,
    default: () => ({}),
  },
});

const form = ref({});

const formRef = useTemplateRef('formInstance');

defineExpose({
  validate: (...args) => formRef.value?.validate?.(...args),
  formData: () => Readonly(props.form ?? form.value),
  formInstance: () => formRef.value,
});
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
                  v-slot:[slotName]
                >
                  <component :is="slotContent"></component>
                </template>
              </component>
            </el-form-item>
          </slot>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>
