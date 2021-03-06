import { ElMessage } from 'element-plus'
import { ref } from 'vue'

type State<D> = {
  code?: number
  data: D & { totalCount?: number; list?: D }
}

type configType<D> = {
  retry?: () => Promise<D>
  callback?: () => void
  successMessage?: string
  // throwError?: boolean,
  // callMsg?: boolean
}

export type resultType = {
  code: number
}

export const useAsync = <D>() => {
  const loading = ref(false)
  const resultData = ref<D>()
  const resultCode = ref()
  const total = ref(0)
  const retry = ref()

  const run = (promise: Promise<State<D>>, config?: configType<State<D>>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    if (config) {
      retry.value = () => config.retry && run(config.retry(), config)
    }

    loading.value = true
    return promise
      .then((res) => {
        resultCode.value = res.code
        if (res.code !== 0) {
          loading.value = false
          return ElMessage({
            message: (res.data as unknown as string) || '请求异常',
            type: 'error'
          })
        }
        // console.log(res, 'res')
        loading.value = false

        if (typeof res.data.totalCount === 'number') {
          resultData.value = res.data.list
          total.value = res.data.totalCount
        } else {
          resultData.value = res.data
        }
        if (config) {
          if (config.callback) {
            config.callback()
          }
          if (config.successMessage) {
            ElMessage({
              message: config.successMessage,
              type: 'success'
            })
          }
        }
      })
      .catch((error) => {
        loading.value = false
        console.log(error, 'error')
        ElMessage({
          message: error.response.data,
          type: 'error'
        })

        // if (config && config.throwError) {
        //   return Promise.reject(error);
        // }
        return error
      })
  }

  return {
    run,
    loading,
    resultCode,
    resultData,
    total,
    retry
  }
}
