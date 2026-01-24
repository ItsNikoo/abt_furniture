import { Promotion, PromotionData} from "@/types"
import {apiRequest} from "@/lib/utils/apiRequest"
import {Filters} from "@/lib/api/filters"

export async function fetchPromotions(filters: Filters = {}): Promise<Promotion[]> {
  const params = new URLSearchParams()
  if (filters.category) params.append('category', filters.category)
  if (filters.style) params.append('style', filters.style)
  if (filters.material) params.append('material', filters.material)
  if (filters.ordering) params.append('ordering', filters.ordering)

  const queryString = params.toString()
  const path = `/promotions/${queryString ? `?${queryString}` : ''}`

  return apiRequest<Promotion[]>(path, {method: "GET"})
}

export async function fetchPromotionById(id: number): Promise<Promotion> {
  return apiRequest<Promotion>(`/promotions/${id}/`, {method: 'GET'})
}

export async function postPromotion(data: PromotionData, token: string): Promise<Promotion> {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('productSlug', data.productSlug)
  formData.append('price', data.price.toString())
  formData.append('description', data.description)
  formData.append('size', data.size)
  formData.append('category', data.category)

  if (data.material) {
    formData.append('material', data.material)
  }
  if (data.style) {
    formData.append('style', data.style)
  }

  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append('photoFiles', file)
    })
  }
  return apiRequest(
    `/promotions/`,
    {
      method: "POST",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function patchPromotion(id: number, data: PromotionData, token: string) {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('productSlug', data.productSlug)
  formData.append('price', data.price.toString())
  formData.append('description', data.description)
  formData.append('size', data.size)
  formData.append('category', data.category)

  if (data.material !== undefined) {
    if (data.material) {
      formData.append('material', data.material)
    } else {
      formData.append('material', '')
    }
  }

  if (data.style !== undefined) {
    if (data.style) {
      formData.append('style', data.style)
    } else {
      formData.append('style', '')
    }
  }

  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append('photoFiles', file)
    })
  }

  if (data.deletePhotos && data.deletePhotos.length > 0) {
    data.deletePhotos.forEach((url) => {
      formData.append('deletePhotos', url)
    })
  }
  return apiRequest(
    `/promotions/${id}/`,
    {
      method: "PATCH",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function deletePromotion(id: number, token: string) {
  return apiRequest(
    `/promotions/${id}/`,
    {
      method: "DELETE",
      token: token
    })
}
