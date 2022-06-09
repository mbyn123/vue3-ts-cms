import { ElMessage } from 'element-plus'
import { ref } from 'vue'

type State<D> = {
  code?: number
  data: D
}

type configType<D> = {
  retry?: () => Promise<D>
  callback?: () => void
  successMessage?: string
  // throwError?: boolean,
  // callMsg?: boolean
}

export const useAsync = <D>() => {
  const loading = ref(false)
  const resultData = ref<D>()
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
        if (res.code !== 0) {
          return ElMessage({
            message: '请求异常',
            type: 'error'
          })
        }
        // console.log(res, 'res')
        resultData.value = res.data
        if (config) {
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
    resultData,
    total,
    retry
  }
}
