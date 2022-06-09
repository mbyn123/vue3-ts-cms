import { getCache } from '@/utils/cache'
import axios, { AxiosRequestConfig } from 'axios'

const httpServer = axios.create({
  baseURL: '/api',
  timeout: 5000
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
})

httpServer.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getCache('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: Error) => Promise.reject(error)
)

httpServer.interceptors.response.use(
  (response) => {
    // switch (response.data.code) {
    //   case 10001:
    //     // logout();
    //     return Promise.reject();
    //   default:
    //     if (response.headers["kaptcha-id"]) {
    //       return response;
    //     }
    //     return response.data;
    // }
    return response.data
  },
  (error) => Promise.reject(error)
)

export default httpServer
