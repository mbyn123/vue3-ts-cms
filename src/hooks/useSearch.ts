import { reactive, ref } from 'vue'
import ZForm from '@/components/form/z-form.vue'
import _ from 'lodash'

export type pagingType = {
  offset: number
  size: number
}

export type pageStateType<T> = {
  searchParmas?: T | object
  page: pagingType
}

export default function useSearch<T>(data: T & object, pages?: pagingType) {
  const defaultPage = pages || {
    offset: 1,
    size: 10
  }

  const searchData = reactive<pageStateType<T>>({
    page: { ...defaultPage },
    searchParmas: {}
  })

  const searchFormData = ref<T & object>({ ...data })

  const formRef = ref<InstanceType<typeof ZForm>>()

  const resetForm = () => formRef.value?.form.resetFields()

  // 分页重置
  const resetPages = () => {
    searchData.page = { ...defaultPage }
  }

  const clone = _.cloneDeep

  return {
    searchData,
    searchFormData,
    formRef,
    clone,
    resetForm,
    resetPages
  }
}
