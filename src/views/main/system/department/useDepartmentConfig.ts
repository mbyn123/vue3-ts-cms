import { tableColumnsType } from '@/components/table/type'
import { formItemsType } from '@/components/form/type'

export default function useDepartmentConfig() {
  const tableColumns: tableColumnsType[] = [
    {
      prop: 'name',
      label: '部门名称',
      align: 'center',
      width: ''
    },
    {
      prop: 'leader',
      label: '部门领导',
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

  const dialogFormItems: formItemsType[] = [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称',
      rules: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导姓名',
      rules: [{ required: true, message: '请输入部门领导姓名', trigger: 'blur' }]
    }
  ]

  return {
    tableColumns,
    dialogFormItems
  }
}
