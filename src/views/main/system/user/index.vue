<template>
  <div class="container">
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
    <ZDialog
      ref="dialogRef"
      destroy
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
import { useAddUser, useDeleteUser, useEditUser, useUserList } from '@/service/api/user'
import { submitFormType, userListItemType, userParamsType } from './type'
import ZTable from '@/components/table/z-table.vue'
import ZForm from '@/components/form/z-form.vue'
import ZDialog from '@/components/dialog/z-dialog.vue'
import useSearch from '@/hooks/useSearch'
import useDialog from '@/hooks/useDialog'
import useUserConfig from './useUserConfig'
import { useDepartmentList } from '@/service/api/department'
import { departmentListType } from '../department/type'
import { reactive, watch } from 'vue'
import { setFormItemsState, setSelectOptionData } from '@/utils'
import { useRoleList } from '@/service/api/role'
import { roleListType } from '../role/type'
import { resultType } from '@/hooks/useAsync'

const initialSearch: userParamsType = {
  name: '',
  id: '',
  realname: '',
  cellphone: '',
  enable: '',
  updateAt: []
}

const initialSubmit: submitFormType = {
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
}

const defautlPageData = reactive({
  page: { offset: 1, size: 100 }
})

const { searchData, searchFormData, formRef, clone, resetForm, resetPages } =
  useSearch<userParamsType>(initialSearch)

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
} = useDialog<submitFormType>('用户', initialSubmit)

const { searchFormItems, tableColumns, dialogFormItems } = useUserConfig(dialogFormData.value)

// 获取用户管理列表接口
const {
  resultData: tableData,
  retry,
  loading,
  total
} = useUserList<userListItemType[], userParamsType>(searchData)

// 新增用户接口
const { mutate: addUser, loading: addLoading } = useAddUser<resultType, submitFormType>()

// 修改用户接口
const { mutate: editUser, loading: editLoading } = useEditUser<resultType, submitFormType>()

// 删除用户接口
const { mutate: deleteUser } = useDeleteUser<resultType>()

// 获取部门列表接口
const { resultData: departmentData, resultCode: departmentCode } = useDepartmentList<
  departmentListType[],
  object
>(defautlPageData)

// 获取角色列表接口
const { resultData: roleData, resultCode: roleCode } = useRoleList<roleListType[], object>(
  defautlPageData
)

watch([departmentCode, roleCode], (code) => {
  if (code[0] === 0 && departmentData.value) {
    setSelectOptionData<departmentListType[]>(dialogFormItems, 'departmentId', departmentData.value)
  }
  if (code[1] === 0 && roleData.value) {
    setSelectOptionData<roleListType[]>(dialogFormItems, 'roleId', roleData.value)
  }
})

const setFormItemHidden = (state: boolean) => {
  setFormItemsState(dialogFormItems, ['password', 'newpassword'], state)
}

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

// 新增
const tableAdd = () => {
  setFormItemHidden(false)
  openDialog('add')
}

// 编辑
const tableEdit = (row: userListItemType) => {
  const { createAt, updateAt, enable, ...rest } = row
  setFormItemHidden(true)
  setDialogFormData({ ...rest })
  openDialog('edit')
}

// 删除
const tableDelete = async (row: userListItemType) => {
  const res = await confirmBox('确认删除当前用户吗?', '删除用户')
  if (res === 'confirm') {
    await deleteUser(row.id, () => retry.value())
  }
}

// 表单提交
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
    const { newpassword, ...rest } = dialogFormData.value
    addUser({ ...rest }, callback)
  }
  if (dialogType.value === 'edit') {
    const { id, ...rest } = dialogFormData.value
    id && editUser(id, { ...rest }, callback)
  }
}
</script>

<style lang="less" scoped></style>
