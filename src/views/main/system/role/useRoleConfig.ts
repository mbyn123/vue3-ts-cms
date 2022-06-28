import { formItemsType } from '@/components/form/type'
import { tableColumnsType } from '@/components/table/type'

export default function useRoleConfig() {
  const searchFormItems: formItemsType[] = [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro'
    },
    {
      type: 'datePicker',
      label: '创建时间',
      prop: 'createTime',
      pickerType: 'daterange'
    }
  ]

  const tableColumns: tableColumnsType[] = [
    { prop: 'name', label: '角色名', width: '' },
    { prop: 'intro', label: '权限介绍', width: '' },
    {
      prop: 'createAt',
      label: '创建时间',
      width: '',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      width: '',
      slotName: 'updateAt'
    },
    {
      prop: '',
      label: '操作',
      align: 'center',
      width: '',
      slotName: 'operations'
    }
  ]

  const dialogFormItems: formItemsType[] = [
    {
      prop: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
      rules: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
    },
    {
      prop: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍',
      rules: [{ required: true, message: '请输入角色介绍', trigger: 'blur' }]
    }
  ]

  return {
    searchFormItems,
    tableColumns,
    dialogFormItems
  }
}
