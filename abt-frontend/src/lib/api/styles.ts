import axios from 'axios'
import { Style } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchStyles(): Promise<Style[]> {
  const response = await fetch(`${BASE_URL}/styles/`, {
    credentials: 'include', // важно для передачи и получения куков
  })
  if (!response.ok) {
    throw new Error('Ошибка при загрузке стилей')
  }
  return response.json()
}

export async function deleteStyle(id: number, token: string) {
  const res = await axios.delete(`${BASE_URL}/styles/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  return res.status
}

export async function postStyle(style: string, token: string) {
  const res = await axios.post(
    `${BASE_URL}/styles/`,
    { style: style },
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  )
  return res.status
}

export async function patchStyle(id: number, style: string, token: string) {
  const res = await axios.patch(`${BASE_URL}/styles/${id}/`,
    { style: style },
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  )
  return res.data
}
