<script setup>
const props = defineProps({
  /**
   * 表头数据
   */
  columns: {
    type: Array,
    default: () => [],
  },
  /**
   * 表格数据
   */
  data: {
    type: Array,
    default: () => [],
  },
  /**
   * 分页数据
   */
  hasPagination: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['size-change', 'current-change']);

const pageQuery = reactive({
  current: 1,
  pages: 1,
  size: 10,
  total: 0,
});
const handleSizeChange = size => {
  pageQuery.size = size;

  emits('size-change', pageQuery);
};
const handleCurrentChange = current => {
  pageQuery.current = current;

  emits('current-change', pageQuery);
};
</script>

<template>
  <div>
    <div>
      <el-table :data="props.data" stripe style="width: 100%" v-bind="$attrs">
        <template v-for="column in props.columns" :key="column.prop">
          <slot :name="column.prop">
            <el-table-column v-bind="column">
              <template v-for="(_slot, slot) in column?.slots" #[slot]="slotProps">
                <component :is="_slot(slotProps)" />
              </template>
            </el-table-column>
          </slot>
        </template>
      </el-table>
    </div>

    <div class="pagination" v-if="props.hasPagination">
      <el-pagination
        v-model:current-page="pageQuery.current"
        v-model:page-size="pageQuery.size"
        :page-sizes="[10, 20, 50, 100]"
        size="default"
        :disabled="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageQuery.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  // position: absolute;
  // right: 32px;
}
</style>
