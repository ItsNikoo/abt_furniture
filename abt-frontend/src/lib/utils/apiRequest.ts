import axios from 'axios';
import { apiUrl } from './baseUrl';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type ApiRequestOptions = {
  method: HttpMethod
  data?: unknown
  token?: string
  isFormData?: boolean
}

export async function apiRequest<T>(
  path: string,
  { method, data, token, isFormData }: ApiRequestOptions = { method: 'GET' }
): Promise<T> {
  try {
    const response = await axios.request({
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
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    console.error('API error:', error);

    throw new Error('Произошла ошибка при выполнении запроса');
  }
}
