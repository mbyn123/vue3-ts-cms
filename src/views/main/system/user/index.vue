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
      :title="dialogTitle"
      :dialogVisible="dialogVisible"
      :formItems="dialogFormItes"
      v-model:formData="dialogFormData"
      @submitForm="submitForm"
      @closeDialog="closeDialog"
    ></ZDialog>
  </div>
</template>

<script lang="ts" setup>
import { useUserList } from '@/service/api/user'
import { submitFormType, userListItemType, userParamsType } from './type'
import ZTable from '@/components/table/z-table.vue'
import ZForm from '@/components/form/z-form.vue'
import ZDialog from '@/components/dialog/z-dialog.vue'
import useSearch from '@/hooks/useSearch'
import useDialog from '@/hooks/useDialog'
import { useDepartmentList } from '@/service/api/department'
import { departmentListType } from '../department/type'
import { reactive, watch } from 'vue'
import { setFormItemsState, setSelectOptionData } from '@/utils'
import { useRoleList } from '@/service/api/role'
import { roleListType } from '../role/type'
import useUserConfig from './useUserConfig'

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
  roleId: 0,
  departmentId: 0
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
  filterFiles,
  closeDialog,
  openDialog,
  setDialogFormData,
  validateDialogForm
} = useDialog<submitFormType>('用户', initialSubmit)

const { searchFormItems, tableColumns, dialogFormItes } = useUserConfig(dialogFormData.value)

// 获取用户管理列表接口
const {
  resultData: tableData,
  retry,
  loading,
  total
} = useUserList<userListItemType[], userParamsType>(searchData)

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
    setSelectOptionData<departmentListType[]>(dialogFormItes, 'departmentId', departmentData.value)
  }
  if (code[1] === 0 && roleData.value) {
    setSelectOptionData<roleListType[]>(dialogFormItes, 'roleId', roleData.value)
  }
})

const setFormItemHidden = (state: boolean) => {
  setFormItemsState(dialogFormItes, ['password', 'newpassword'], state)
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
  setFormItemHidden(true)
  setDialogFormData(clone(filterFiles(row, dialogFormItes)))
  openDialog('edit')
}

// 删除
const tableDelete = (row: userListItemType) => {}

// 表单提交
const submitForm = async () => {
  console.log(dialogFormData.value, 'dialogFormData')

  const valid = await validateDialogForm()
  if (!valid) {
    return
  }
  if (dialogType.value === 'add') {
  }
  if (dialogType.value === 'edit') {
  }
}
</script>

<style lang="less" scoped></style>
