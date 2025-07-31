import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function login(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
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

  // Сохраняем токен в cookie
  Cookies.set('token', data.token, {
    expires: 7, // 7 дней
    secure: process.env.NODE_ENV === 'production', // только через HTTPS в проде
    sameSite: 'Strict',
  })

  return data
}

export function logout() {
  Cookies.remove('token')
}

export function getToken() {
  return Cookies.get('token')
}
