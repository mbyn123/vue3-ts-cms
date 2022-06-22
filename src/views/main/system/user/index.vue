<template>
  <div class="container">
    <z-form
      ref="formRef"
      :formItems="formItems"
      :formData="formData"
      @handResetClick="handResetClick"
      @handSubmitClick="handSubmitClick"
    />
    <z-table
      :tableData="tableData"
      :tableColumns="tableColumns"
      v-model:page="state.page"
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
import { useUserList } from '@/service/api/user'
import { userListItemType, userpParamsType } from './type'
import ZTable from '@/components/table/z-table.vue'
import ZForm from '@/components/form/z-form.vue'
import { tableColumnsType } from '@/components/table/type'
import { formItemsType } from '@/components/form/type'
import useSearch from '@/hooks/useSearch'

const { state, formData, formRef, resetForm, resetPages } = useSearch<userpParamsType>({
  name: '',
  id: '',
  realname: '',
  cellphone: '',
  enable: '',
  updateAt: []
})

// 获取用户管理列表接口
const { resultData: tableData, retry, loading, total } = useUserList<userListItemType[]>(state)

// 点击搜索
const handSubmitClick = () => {
  resetPages()
  state.searchParmas = JSON.parse(JSON.stringify(formData))
}

// 点击重置
const handResetClick = () => {
  resetPages()
  resetForm()
}

const tableEdit = (row: userListItemType) => {}

const tableDelete = (row: userListItemType) => {}

const formItems: formItemsType[] = [
  {
    type: 'input',
    label: '用户ID',
    prop: 'id'
  },
  {
    type: 'input',
    label: '用户名',
    prop: 'name'
  },
  {
    type: 'input',
    label: '真实姓名',
    prop: 'realname'
  },
  {
    type: 'input',
    label: '电话号码',
    prop: 'cellphone'
  },
  {
    type: 'select',
    label: '用户状态',
    prop: 'enable',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    type: 'datePicker',
    label: '创建时间',
    prop: 'updateAt',
    pickerType: 'daterange'
  }
]

const tableColumns: tableColumnsType[] = [
  {
    prop: 'name',
    label: '用户名',
    align: 'center',
    width: ''
  },
  {
    prop: 'realname',
    label: '真实姓名',
    align: 'center',
    width: ''
  },
  {
    prop: 'cellphone',
    label: '手机号码',
    align: 'center',
    width: ''
  },
  {
    prop: 'enable',
    label: '状态',
    width: '100',
    align: 'center',
    slotName: 'enable'
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
