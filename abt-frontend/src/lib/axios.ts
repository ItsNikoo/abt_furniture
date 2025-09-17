// src/lib/axios.ts
import axios from 'axios'
import Cookies from 'js-cookie'
import { getApiBaseUrl } from '@/lib/api/baseUrl'

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default axiosInstance
