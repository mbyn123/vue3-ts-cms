<template>
  <div class="container" v-loading="loading" element-loading-text="Loading...">
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60" />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        :index="indexMethod"
        label="序号"
        align="center"
        width="80"
      />
      <template v-for="item in tableColumns" :key="item.prop">
        <el-table-column v-bind="item">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="page-wrapper" v-if="page">
      <el-pagination
        v-model:currentPage="page.offset"
        v-model:page-size="page.size"
        :page-sizes="[5, 10, 20, 30, 50]"
        :small="false"
        :disabled="false"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageType, tableColumnsType } from './type'
import { ElTable } from 'element-plus'
const { page, showIndexColumn } = defineProps<{
  tableData: any
  tableColumns: tableColumnsType[]
  page?: pageType
  total?: number
  loading: boolean
  showIndexColumn?: boolean
  showSelectColumn?: boolean
}>()

const emit = defineEmits(['selectionChange'])

const indexMethod = (index: number) => {
  if (page && showIndexColumn) {
    const pageIndex = page.offset // 当前页
    const pageSize = page.size // 每页条数
    return index + 1 + (pageIndex - 1) * pageSize
  }
}

const handleSelectionChange = (value: any[]) => {
  emit('selectionChange', value)
}
</script>

<style lang="less" scoped>
.container {
  .page-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }
}
</style>
