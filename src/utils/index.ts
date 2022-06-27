import { formItemsType, keySelectOptionsType } from '@/components/form/type'

export const setSelectOptionData = <T>(formItems: formItemsType[], key: string, data: T) => {
  return formItems.forEach((i) => {
    if (i.type === 'select' && i.prop === key) {
      i.options = data as unknown as keySelectOptionsType[]
    }
  })
}

export const setFormItemsState = (formItems: formItemsType[], keys: string[], state: boolean) => {
  return formItems.forEach((i) => {
    if (keys.includes(i.prop)) {
      i.isHidden = state
    }
  })
}
