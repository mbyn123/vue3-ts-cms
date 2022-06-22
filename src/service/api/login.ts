import { useAsync } from '@/hooks/useAsync'
import { onMounted } from 'vue'
import service from '..'

// 登录
export const useLogin = <P, D>() => {
  const { run, ...rest } = useAsync<D>()
  const mutate = (data: P) => {
    return run(service.post('/login', data), { successMessage: '登录成功' })
  }
  return { mutate, ...rest }
}

// 获取当前登录用户信息
export const useAdminUser = <D>(id: number) => {
  const { run, ...rest } = useAsync<D>()
  const request = () => service.get(`/users/${id}`, {})
  onMounted(() => run(request()))
  return { ...rest }
}

// 获取当前登录用户菜单
export const useAdminMenu = <D>(id: number) => {
  const { run, ...rest } = useAsync<D>()
  const request = () => service.get(`/role/${id}/menu`, {})
  onMounted(() => run(request()))
  return { ...rest }
}
