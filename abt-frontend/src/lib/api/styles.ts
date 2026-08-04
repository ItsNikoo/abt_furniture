import {Style} from '@/types'
import {apiGet, apiRequest} from "@/lib/utils/apiRequest"

export async function fetchStyles(): Promise<Style[]> {
  return apiGet<Style[]>("/styles/", {fallback: []})
}

export async function postStyle(style: string, token: string) {
  return apiRequest<Style>(
    `/styles/`,
    {
      method: "POST",
      data: {style},
      token: token
    }
  )
}

export async function patchStyle(id: number, style: string, token: string) {
  return apiRequest<Style>(
    `/styles/${id}/`,
    {
      method: "PATCH",
      data: {style},
      token: token
    }
  )
}

export async function deleteStyle(id: number, token: string) {
  return apiRequest<Style>(
    `/styles/${id}/`,
    {
      method: "DELETE",
      token: token
    })
}
