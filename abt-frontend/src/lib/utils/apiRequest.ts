import axios from 'axios'
import { apiUrl } from './baseUrl'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type ApiRequestOptions = {
  method: HttpMethod
  data?: unknown
  token?: string
  isFormData?: boolean
}

const axiosInstance = axios.create({
//  baseURL: process.env.NEXT_PUBLIC_API_URL,
  proxy: false, // Отключаем proxy
  withCredentials: true,
})

export async function apiRequest<T>(
  path: string,
  { method, data, token, isFormData }: ApiRequestOptions = { method: 'GET' }
): Promise<T> {
  try {
    const response = await axiosInstance.request({
      url: apiUrl(path),
      method,
      data,
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
        // Добавляем Content-Type только если это НЕ FormData и метод предполагает тело (POST, PATCH, PUT)
        ...(!isFormData && data !== undefined && ['POST', 'PATCH', 'PUT'].includes(method)
          ? { 'Content-Type': 'application/json' }
          : {}),
      },
    })

    return response.data
  } catch (error: unknown) {
    console.error('API error:', error)

    throw new Error('Произошла ошибка при выполнении запроса')
  }
}
