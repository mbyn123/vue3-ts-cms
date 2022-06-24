import { reactive, ref } from 'vue'
import ZForm from '@/components/form/z-form.vue'
import _ from 'lodash'

type pagingType = {
  offset: number
  size: number
}

export type pageStateType<T> = {
  searchParmas: T | object
  page: pagingType
}

export default function useSearch<T>(date: T & object, pages?: pagingType) {
  const defaultPage = pages || {
    offset: 1,
    size: 5
  }

  const searchParam = reactive<pageStateType<T>>({
    page: { ...defaultPage },
    searchParmas: {}
  })

  const searchFormData = reactive<T & object>(date)

  const formRef = ref<InstanceType<typeof ZForm>>()

  const resetForm = () => formRef.value?.form.resetFields()

  // 分页重置
  const resetPages = () => {
    searchParam.page = { ...defaultPage }
  }

  const clone = _.cloneDeep

  return {
    searchParam,
    searchFormData,
    formRef,
    clone,
    resetForm,
    resetPages
  }
}
