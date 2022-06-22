type inputItemType = {
  type: 'input'
}

type selectItemType = {
  type: 'select'
  options: Array<{ label: string; value: any }>
}

type datePickerItemType = {
  type: 'datePicker'
  pickerType: 'daterange' | 'datetimerange' | 'datetime' | 'date'
}

type commItemType = {
  label: string
  prop: string
  placeholder?: string
}

export type formItemsType = (inputItemType | selectItemType | datePickerItemType) & commItemType

export type labelColType = { xs: number; sm: number; md: number; lg: number; xl: number }
