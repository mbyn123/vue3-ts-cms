import { useAsync } from '@/hooks/useAsync'
import { pageStateType } from '@/hooks/useSearch'
import { watch } from 'vue'
import service from '..'

export const useDepartmentList = <D, P>(data: pageStateType<P>) => {
  const { run, ...rest } = useAsync<D>()
  const request = () => service.post('/department/list', { ...data.page, ...data.searchParmas })
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

export const useAddDepartment = <D, P>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (data: P, callback: () => void) => {
    return run(service.post('/department', data), { successMessage: '创建部门成功', callback })
  }
  return { mutate, ...rest }
}

export const useEditDepartment = <D, P>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (id: number, data: P, callback: () => void) => {
    return run(service.patch(`/department/${id}`, data), {
      successMessage: '修改部门成功',
      callback
    })
  }
  return { mutate, ...rest }
}

export const useDeleteDepartment = <D>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (id: number, callback: () => void) => {
    return run(service.delete(`/department/${id}`, {}), {
      successMessage: '删除部门成功',
      callback
    })
  }
  return { mutate, ...rest }
}
