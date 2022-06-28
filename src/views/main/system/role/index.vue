<template>
  <div>
    <z-form
      mode="search"
      ref="formRef"
      :formItems="searchFormItems"
      :formData="searchFormData"
      @handResetClick="handResetClick"
      @handSubmitClick="handSubmitClick"
    />
    <el-button type="primary" icon="Plus" @click="tableAdd">新增</el-button>
    <z-table
      :tableData="roleData"
      :tableColumns="tableColumns"
      v-model:page="searchData.page"
      :total="total"
      :loading="loading"
      showIndexColumn
    >
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
      :formItems="dialogFormItems"
      v-model:formData="dialogFormData"
      @submitForm="submitForm"
      @closeDialog="closeDialog"
    ></ZDialog>
  </div>
</template>

<script lang="ts" setup>
import useDialog from '@/hooks/useDialog'
import useSearch from '@/hooks/useSearch'
import { useRoleList } from '@/service/api/role'
import { roleListType, roleSearchParamType } from './type'
import useRoleConfig from './useRoleConfig'

const initialSearch: roleSearchParamType = {
  name: '',
  intro: '',
  createAt: ''
}

const initialSubmit = {}

const { searchFormItems, tableColumns, dialogFormItems } = useRoleConfig()

const { searchData, searchFormData, formRef, clone, resetForm, resetPages } =
  useSearch<roleSearchParamType>(initialSearch)

const {
  dialogRef,
  dialogVisible,
  dialogTitle,
  dialogType,
  dialogFormData,
  confirmBox,
  closeDialog,
  openDialog,
  setDialogFormData,
  validateDialogForm
} = useDialog<any>('角色', initialSubmit)

// 获取角色列表接口
const {
  resultData: roleData,
  total,
  loading,
  retry
} = useRoleList<roleListType[], object>(searchData)

// 点击搜索
const handSubmitClick = () => {
  resetPages()
  searchData.searchParmas = clone(searchFormData.value)
}

// 点击重置
const handResetClick = () => {
  resetForm()
  handSubmitClick()
}

const tableAdd = () => {
  openDialog('add')
}

const tableEdit = (row: roleListType) => {
  const { name, intro, id } = row
  setDialogFormData({ name, intro, id })
  openDialog('edit')
}

const tableDelete = async (row: roleListType) => {
  const res = await confirmBox('确认删除当前角色吗?', '删除角色')
  if (res === 'confirm') {
  }
}

const submitForm = async () => {
  const valid = await validateDialogForm()
  if (!valid) {
    return
  }
  const callback = () => {
    closeDialog()
    retry.value()
  }
  if (dialogType.value === 'add') {
  }
  if (dialogType.value === 'edit') {
  }
}
</script>

<style lang="less" scoped></style>
