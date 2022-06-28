<template>
  <div>
    <el-button type="primary" icon="Plus" @click="tableAdd">新增</el-button>
    <z-table
      :tableData="tableData"
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
      :confirmLoading="addLoading || editLoading"
      v-model:formData="dialogFormData"
      @submitForm="submitForm"
      @closeDialog="closeDialog"
    ></ZDialog>
  </div>
</template>

<script lang="ts" setup>
import { resultType } from '@/hooks/useAsync'
import useDialog from '@/hooks/useDialog'
import useSearch from '@/hooks/useSearch'
import {
  useAddDepartment,
  useDeleteDepartment,
  useDepartmentList,
  useEditDepartment
} from '@/service/api/department'
import { departmentListType, departmentSubmitType } from './type'
import useDepartmentConfig from './useDepartmentConfig'

const { tableColumns, dialogFormItems } = useDepartmentConfig()

const { searchData } = useSearch({})

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
} = useDialog<departmentSubmitType>('部门', {
  name: '',
  parentId: 1,
  leader: ''
})

// 获取部门列表接口
const {
  resultData: tableData,
  retry,
  loading,
  total
} = useDepartmentList<departmentListType[], object>(searchData)

const { mutate: addDepartment, loading: addLoading } = useAddDepartment<
  resultType,
  departmentSubmitType
>()

const { mutate: editDepartment, loading: editLoading } = useEditDepartment<
  resultType,
  departmentSubmitType
>()

const { mutate: deleteDepartment } = useDeleteDepartment<resultType>()

const tableAdd = () => {
  openDialog('add')
}

const tableEdit = (row: departmentListType) => {
  const { name, leader, parentId, id } = row
  openDialog('edit')
  setDialogFormData({ name, leader, parentId, id })
}

const tableDelete = async (row: departmentListType) => {
  const res = await confirmBox('确认删除当前部门吗?', '删除部门')
  if (res === 'confirm') {
    await deleteDepartment(row.id, () => retry.value())
  }
}

const submitForm = async () => {
  const vaild = await validateDialogForm()
  if (!vaild) {
    return
  }
  const callback = () => {
    closeDialog()
    retry.value()
  }
  console.log(dialogType.value)

  if (dialogType.value === 'add') {
    addDepartment(dialogFormData.value, callback)
  }
  if (dialogType.value === 'edit') {
    const { id, ...rest } = dialogFormData.value
    id && editDepartment(id, { ...rest }, callback)
  }
}
</script>

<style lang="less" scoped></style>
