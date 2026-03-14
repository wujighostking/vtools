<script setup lang="ts">
import type { VNode } from 'vue'
import { reactive } from 'vue'

export interface ColumnConfig {
  prop?: string
  label?: string
  width?: string | number
  slots?: Record<string, (scope: Record<string, unknown>) => VNode>
  [key: string]: unknown
}

export interface PageQuery {
  current: number
  pages: number
  size: number
  total: number
}

const props = withDefaults(defineProps<{
  /** 表头数据 */
  columns?: ColumnConfig[]
  /** 表格数据 */
  data?: Record<string, unknown>[]
  /** 是否显示分页 */
  hasPagination?: boolean
}>(), {
  columns: () => [],
  data: () => [],
  hasPagination: true,
})

const emits = defineEmits<{
  sizeChange: [query: PageQuery]
  currentChange: [query: PageQuery]
}>()

const pageQuery = reactive<PageQuery>({
  current: 1,
  pages: 1,
  size: 10,
  total: 0,
})

function getColumnProps(column: ColumnConfig) {
  const { slots: _, ...rest } = column
  return rest
}

function handleSizeChange(size: number) {
  pageQuery.size = size
  emits('sizeChange', pageQuery)
}

function handleCurrentChange(current: number) {
  pageQuery.current = current
  emits('currentChange', pageQuery)
}
</script>

<template>
  <div>
    <div>
      <el-table :data="props.data" style="width: 100%" v-bind="$attrs">
        <template v-for="(column, index) in props.columns" :key="column.prop">
          <slot :name="column.prop" :row="props.data[index]">
            <el-table-column v-bind="getColumnProps(column)">
              <template v-for="(_slot, slot) in column?.slots" :key="slot" #[slot]="slotProps">
                <component :is="_slot(slotProps)" />
              </template>
            </el-table-column>
          </slot>
        </template>
      </el-table>
    </div>

    <div v-if="props.hasPagination" class="pagination">
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

<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
