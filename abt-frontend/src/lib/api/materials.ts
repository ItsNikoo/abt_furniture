import axios from 'axios'
import { Material } from '@/types'
import { apiUrl } from '@/lib/api/baseUrl'

// GET запрос
export async function fetchMaterials(): Promise<Material[]> {
  try {
    const response = await fetch(apiUrl('/materials/'),
      {
        credentials: 'include', // важно для передачи и получения куков
      },
    )
    if (!response.ok) {
      return []
    }
    return response.json()
  } catch (err) {
    console.error('Ошибка в функции fetchMaterials:', err)
    return []
  }
}

// DELETE запрос
export async function deleteMaterial(id: number, token: string) {
  const res = await axios.delete(apiUrl(`/materials/${id}/`), {
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
    apiUrl('/materials/'),
    { material },
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

// PATCH запрос
export async function patchMaterial(id: number, material: string, token: string) {
  const res = await axios.patch(apiUrl(`/materials/${id}/`),
    { material },
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
