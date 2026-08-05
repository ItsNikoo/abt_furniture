import {Material} from '@/types/types'
import {apiGet, apiRequest} from "@/lib/utils/apiRequest"

// GET запрос
export async function fetchMaterials() {
  return apiGet<Material[]>('/materials/', {fallback: []})
}

// POST запрос
export async function postMaterial(material: string, token: string) {
  return apiRequest<Material>(
    `/materials/`,
    {
      method: 'POST',
      data: {material},
      token: token
    }
  )
}

// PATCH запрос
export async function patchMaterial(id: number, material: string, token: string) {
  return apiRequest<Material>(
    `/materials/${id}/`,
    {
      method: 'PATCH',
      data: {material},
      token: token
    }
  )
}

// DELETE запрос
export async function deleteMaterial(id: number, token: string) {
  return apiRequest<Material>(
    `/materials/${id}/`,
    {
      method: 'DELETE',
      token: token
    })
}
