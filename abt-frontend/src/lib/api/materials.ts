import axios from 'axios'
import {Material} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// GET запрос
export async function fetchMaterials(): Promise<Material[]> {
  const response = await fetch(`${BASE_URL}/materials/`,
    {
      credentials: 'include', // важно для передачи и получения куков
    }
  )
  if (!response.ok) {
    throw new Error('Ошибка при загрузке материалов')
  }
  return response.json()
}

// DELETE запрос
export async function deleteMaterial(id: number, token: string) {
  const res = await axios.delete(`${BASE_URL}/materials/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  return res.status
}


// POST запрос
export async function postMaterial(material: string, token: string) {
  const res = await axios.post(
    `${BASE_URL}/materials/`,
    {material},
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )
  return res.status
}

// PATCH запрос
export async function patchMaterial(id: number, material: string, token: string) {
  const res = await axios.patch(`${BASE_URL}/materials/${id}/`,
    {material},
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )
  return res.status
}
