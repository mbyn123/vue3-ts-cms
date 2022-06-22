import { useAsync } from '@/hooks/useAsync'
import { pageStateType } from '@/hooks/useSearch'
import { userpParamsType } from '@/views/main/system/user/type'
import { watch } from 'vue'
import service from '..'

export const useUserList = <D>(data: pageStateType<userpParamsType>) => {
  const { run, ...rest } = useAsync<D>()
  const request = () => service.post('/users/list', { ...data.searchParmas, ...data.page })
  watch(
    data,
    () => {
      run(request(), { retry: request })
    },
    { immediate: true }
  )
  return { ...rest }
}
