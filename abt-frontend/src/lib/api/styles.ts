import axios from 'axios'
import { Style } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchStyles(): Promise<Style[]> {
  const response = await fetch(`${BASE_URL}/styles/`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке стилей')
  }
  return response.json()
}

export async function deleteStyle(id: number) {
  const res = await axios.delete(`${BASE_URL}/styles/${id}/`)
  return res.status
}

export async function postStyle(style: string) {
  const res = await axios.post(`${BASE_URL}/styles/`, { style: style })
  return res.status
}

export async function patchStyle(id: number, style: string) {
  const res = await axios.patch(`${BASE_URL}/styles/${id}/`, { style: style })
  return res.data
}
