import axios from 'axios'
import { Material } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchMaterials(): Promise<Material[]> {
  const response = await fetch(`${BASE_URL}/materials/`)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке материалов')
  }
  return response.json()
}

export async function deleteMaterial(id: number) {
  const res = await axios.delete(`${BASE_URL}/materials/${id}/`)
  return res.status
}

export async function postMaterial(material: string) {
  const res = await axios.post(`${BASE_URL}/materials/`, { material: material })
  return res.status
}

export async function patchMaterial(id: number, material: string) {
  const res = await axios.patch(`${BASE_URL}/materials/${id}/`, { material: material })
  return res.status
}
