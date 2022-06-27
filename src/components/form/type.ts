import { FormItemRule } from 'element-plus'

type inputItemType = {
  type: 'input' | 'password'
}

export type keySelectOptionsType = {
  [k: string]: string | number
}
type selectItemType = {
  type: 'select'
  options: keySelectOptionsType[]
  optionKey?: { label: keyof keySelectOptionsType; value: keyof keySelectOptionsType }
}

type datePickerItemType = {
  type: 'datePicker'
  pickerType: 'daterange' | 'datetimerange' | 'datetime' | 'date'
}

type commItemType = {
  label: string
  prop: string
  placeholder?: string
  rules?: FormItemRule | FormItemRule[]
  isHidden?: boolean
}

export type modaType = 'search' | 'submit'

export type formItemsType = (inputItemType | selectItemType | datePickerItemType) & commItemType

export type labelColType =
  | { xs: number; sm: number; md: number; lg: number; xl: number }
  | { span: number }
