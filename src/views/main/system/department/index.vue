<template>
  <div>
    <el-form :model="form" ref="ruleFormRef">
      <el-form-item prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="ss">
        <el-input v-model="form.ss" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resest">Cancel</el-button>
      </el-form-item>
    </el-form>
    <z-table
      :tableData="tableData"
      :tableColumns="tableColumns"
      v-model:page="searchData.page"
      :total="total"
      :loading="loading"
      showIndexColumn
    >
      <template #enable="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #operations="scope">
        <div>
          <el-button plain type="primary" @click="tableEdit(scope.row)">编辑</el-button>
          <el-button plain type="danger" @click="tableDelete(scope.row)">删除</el-button>
        </div>
      </template>
    </z-table>
  </div>
</template>

<script lang="ts" setup>
import { tableColumnsType } from '@/components/table/type'
import useSearch from '@/hooks/useSearch'
import { useDepartmentList } from '@/service/api/department'
import { FormInstance } from 'element-plus'
import { ref } from 'vue'
import { reactive } from 'vue-demi'
import { departmentListType } from './type'

const { searchData } = useSearch({})
const ruleFormRef = ref<FormInstance>()

const form = reactive({
  name: '',
  ss: ''
})

const resest = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
    console.log(form, 'f')
  }
}

// 获取部门列表接口
const {
  resultData: tableData,
  retry,
  loading,
  total
} = useDepartmentList<departmentListType[], object>(searchData)

const tableEdit = (row: departmentListType) => {}

const tableDelete = (row: departmentListType) => {}

const tableColumns: tableColumnsType[] = [
  {
    prop: 'name',
    label: '部门名称',
    align: 'center',
    width: ''
  },
  {
    prop: 'createAt',
    label: '创建时间',
    align: 'center',
    width: ''
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    align: 'center',
    width: ''
  },
  {
    prop: '',
    label: '操作',
    align: 'center',
    width: '200',
    slotName: 'operations'
  }
]
</script>

<style lang="less" scoped></style>
