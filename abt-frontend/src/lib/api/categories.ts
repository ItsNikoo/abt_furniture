import {Category, CategoryData} from '@/types'
import {apiGet, apiRequest} from "@/lib/utils/apiRequest"

export async function fetchCategories(): Promise<Category[]> {
  return apiGet<Category[]>(`/categories/`, {fallback: []})
}

export async function postCategory(data: CategoryData, token: string) {
  const formData = new FormData()
  formData.append('category_slug', data.categorySlug)
  formData.append('category', data.category)

  if (data.photoFile) {
    formData.append('photo_file', data.photoFile)
  }
  return apiRequest<Category>(
    `/categories/`,
    {
      method: 'POST',
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}


export async function patchCategory(id: number, data: CategoryData, token: string) {
  const formData = new FormData()
  formData.append('category', data.category)
  formData.append('category_slug', data.categorySlug)

  if (data.photoFile) {
    formData.append('photo_file', data.photoFile)
  }
  return apiRequest(
    `/categories/${id}/`,
    {
      method: 'PATCH',
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function deleteCategory(id: number, token: string) {
  return apiRequest(
    `/categories/${id}/`,
    {
      method: 'DELETE',
      token: token,
    })
}
