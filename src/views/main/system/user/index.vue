<template>
  <div class="container">
    <z-form
      mode="search"
      ref="formRef"
      :formItems="formItems"
      :formData="searchFormData"
      @handResetClick="handResetClick"
      @handSubmitClick="handSubmitClick"
    />
    <el-button type="primary" icon="Plus" @click="tableAdd">新增</el-button>
    <z-table
      :tableData="tableData"
      :tableColumns="tableColumns"
      v-model:page="searchParam.page"
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
    <ZDialog
      ref="dialogRef"
      :title="dialogTitle"
      :dialogVisible="dialogVisible"
      :formItems="dialogFormItes"
      :formData="dialogFormData"
      @submitForm="submitForm"
      @closeDialog="closeDialog"
    ></ZDialog>
  </div>
</template>

<script lang="ts" setup>
import { useUserList } from '@/service/api/user'
import { userListItemType, userParamsType } from './type'
import ZTable from '@/components/table/z-table.vue'
import ZForm from '@/components/form/z-form.vue'
import ZDialog from '@/components/dialog/z-dialog.vue'
import { tableColumnsType } from '@/components/table/type'
import { formItemsType } from '@/components/form/type'
import useSearch from '@/hooks/useSearch'
import useDialog from '@/hooks/useDialog'

const initialSearch: userParamsType = {
  name: '',
  id: '',
  realname: '',
  cellphone: '',
  enable: '',
  updateAt: []
}

const { searchParam, searchFormData, formRef, clone, resetForm, resetPages } =
  useSearch<userParamsType>(initialSearch)

const {
  dialogRef,
  dialogVisible,
  dialogTitle,
  dialogType,
  dialogFormData,
  closeDialog,
  openDialog,
  setDialogFormData,
  validateDialogForm
} = useDialog<userListItemType>('用户')

// 获取用户管理列表接口
const {
  resultData: tableData,
  retry,
  loading,
  total
} = useUserList<userListItemType[]>(searchParam)

// 点击搜索
const handSubmitClick = () => {
  resetPages()
  searchParam.searchParmas = clone(searchFormData)
}

// 点击重置
const handResetClick = () => {
  resetForm()
  handSubmitClick()
}

// 新增
const tableAdd = () => {
  openDialog('add')
}

// 编辑
const tableEdit = (row: userListItemType) => {
  setDialogFormData(clone(row))
  openDialog('edit')
}

// 删除
const tableDelete = (row: userListItemType) => {}

// 表单提交
const submitForm = async () => {
  const valid = await validateDialogForm()
  if (!valid) {
    return
  }
  if (dialogType.value === 'add') {
  }
  if (dialogType.value === 'edit') {
  }
}

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

const dialogFormItes: formItemsType[] = [
  {
    type: 'input',
    label: '用户ID',
    prop: 'id',
    rules: [{ required: true, message: '请输入用户ID', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '用户名',
    prop: 'name',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '真实姓名',
    prop: 'realname',
    rules: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
  },
  {
    type: 'input',
    label: '电话号码',
    prop: 'cellphone',
    rules: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
  }
]
</script>

<style lang="less" scoped></style>
