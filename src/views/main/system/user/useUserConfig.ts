import { formItemsType } from '@/components/form/type'
import { tableColumnsType } from '@/components/table/type'
import { reactive } from 'vue'
import { submitFormType } from './type'
import { InternalRuleItem, Value } from 'async-validator/dist-types'

const useUserConfig = (dialogFormData: submitFormType) => {
  const searchFormItems: formItemsType[] = [
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

  const validatorPass = (
    rule: InternalRuleItem,
    value: Value,
    callback: (err?: string | Error) => void
  ) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else if (value !== dialogFormData.password) {
      callback(new Error('两次密码输入不一致'))
    } else {
      callback()
    }
  }

  const validatorPhone = (
    rule: InternalRuleItem,
    value: Value,
    callback: (err?: string | Error) => void
  ) => {
    const res = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
    if (value === '') {
      callback(new Error('请输入手机号'))
    } else if (!res.test(value)) {
      callback(new Error('手机号格式不正确'))
    } else {
      callback()
    }
  }

  const dialogFormItems = reactive<formItemsType[]>([
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入真实姓名',
      rules: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
    },
    {
      type: 'password',
      label: '密码',
      prop: 'password',
      placeholder: '请输入密码',
      isHidden: false,
      rules: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码最少6位数', trigger: 'blur' }
      ]
    },
    {
      type: 'password',
      label: '确认密码',
      prop: 'newpassword',
      placeholder: '请输入确认密码',
      isHidden: false,
      rules: [{ required: true, validator: validatorPass, trigger: 'blur' }]
    },
    {
      type: 'input',
      label: '电话号码',
      prop: 'cellphone',
      placeholder: '请输入电话号码',
      rules: [{ required: true, validator: validatorPhone, trigger: 'blur' }]
    },
    {
      type: 'select',
      label: '部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
      options: [],
      optionKey: { label: 'name', value: 'id' },
      rules: [{ required: true, message: '请选择部门', trigger: 'change' }]
    },
    {
      type: 'select',
      label: '角色',
      prop: 'roleId',
      placeholder: '请选择角色',
      options: [],
      optionKey: { label: 'name', value: 'id' },
      rules: [{ required: true, message: '请选择角色', trigger: 'change' }]
    }
  ])

  return {
    searchFormItems,
    tableColumns,
    dialogFormItems
  }
}

export default useUserConfig
