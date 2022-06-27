import { useAsync } from '@/hooks/useAsync'
import { pageStateType } from '@/hooks/useSearch'
import { watch } from 'vue'
import service from '..'

export const useRoleList = <D, P>(data: pageStateType<P>) => {
  const { run, ...rest } = useAsync<D>()
  const request = () => service.post('/role/list', { ...data.page, ...data.searchParmas })
  watch(
    data,
    () => {
      run(request(), { retry: request })
    },
    {
      immediate: true
    }
  )
  return { ...rest }
}
