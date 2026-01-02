import Cookies from 'js-cookie'
import { apiUrl } from '@/lib/utils/baseUrl'

export async function login(username: string, password: string) {
  const response = await fetch(apiUrl('/auth/login/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Ошибка при логине')
  }

  const data = await response.json()

  console.log('Получен токен от сервера:', data.token) // DEBUG

  // Токен живет 1 час на бэкенде
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) //  * 60 * 1000

  // ВАЖНО: Сохраняем токен в cookie
  Cookies.set('token', data.token, {
    expires: 1/24, // 1 час в днях
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  })

  console.log('Токен сохранен в cookie') // DEBUG

  // Сохраняем время истечения
  Cookies.set('tokenExpiresAt', expiresAt.toISOString(), {
    expires: 1/24,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  })

  console.log('Время истечения сохранено:', expiresAt.toISOString()) // DEBUG

  return data
}

export function logout() {
  Cookies.remove('token')
  Cookies.remove('tokenExpiresAt')
}

export function getToken() {
  return Cookies.get('token')
}

export function getTokenExpiresAt(): string | undefined {
  return Cookies.get('tokenExpiresAt')
}

export function isTokenExpired(): boolean {
  const token = getToken()
  const expiresAt = getTokenExpiresAt()

  if (!token || !expiresAt) return true

  return new Date() >= new Date(expiresAt)
}

export function checkAndLogoutIfExpired(): boolean {
  if (isTokenExpired()) {
    logout()
    return true
  }
  return false
}