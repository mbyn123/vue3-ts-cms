import { useAsync } from '@/hooks/useAsync'
import { pageStateType } from '@/hooks/useSearch'
import { watch } from 'vue'
import service from '..'

export const useUserList = <D, P>(data: pageStateType<P>) => {
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

export const useAddUser = <D, P>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (data: P, callback: () => void) => {
    return run(service.post('/users', data), { successMessage: '用户创建成功', callback })
  }
  return { mutate, ...rest }
}

export const useEditUser = <D, P>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (id: number, data: P, callback: () => void) => {
    return run(service.patch(`/users/${id}`, data), { successMessage: '修改用户成功', callback })
  }
  return { mutate, ...rest }
}

export const useDeleteUser = <D>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (id: number, callback: () => void) => {
    return run(service.delete(`/users/${id}`, {}), { successMessage: '删除用户成功', callback })
  }
  return { mutate, ...rest }
}
