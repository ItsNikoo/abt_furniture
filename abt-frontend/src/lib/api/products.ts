import {Product, ProductData} from '@/types/types'
import {apiGet, apiRequest} from "@/lib/utils/apiRequest"
import {Filters} from "@/lib/api/filters"


export async function fetchProducts(filters: Filters = {}): Promise<Product[]> {
  const params = new URLSearchParams()
  if (filters.category) params.append('category', filters.category)
  if (filters.style) params.append('style', filters.style)
  if (filters.material) params.append('material', filters.material)
  if (filters.ordering) params.append('ordering', filters.ordering)

  const queryString = params.toString()
  const path = `/products/${queryString ? `?${queryString}` : ''}`

  return apiGet<Product[]>(path, {fallback: []})
}

export async function fetchProductById(id: number): Promise<Product> {
  return apiGet<Product>(`/products/${id}/`)
}

export async function postProduct(data: ProductData, token: string): Promise<Product> {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('product_slug', data.productSlug)
  formData.append('price', data.price.toString())
  formData.append('description', data.description)
  formData.append('category', data.category)
  formData.append('material', data.material)

  if (data.style) {
    formData.append('style', data.style)
  }

  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append('photo_files', file)
    })
  }

  return apiRequest<Product>('/products/', {
    method: 'POST',
    data: formData,
    token,
    isFormData: true,
  })
}

export async function patchProduct(data: ProductData, id: number, token: string): Promise<Product> {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('product_slug', data.productSlug)
  formData.append('price', data.price.toString())
  formData.append('description', data.description)
  formData.append('category', data.category)
  formData.append('material', data.material)

  if (data.style) {
    formData.append('style', data.style)
  }

  if (data.deletePhotos && data.deletePhotos.length > 0) {
    data.deletePhotos.forEach((url) => {
      formData.append('delete_photos', url)
    })
  }

  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append('photo_files', file)
    })
  }

  return apiRequest<Product>(`/products/${id}/`, {
    method: 'PATCH',
    data: formData,
    token,
    isFormData: true,
  })
}

export async function deleteProduct(id: number, token: string) {
  return apiRequest(
    `/products/${id}/`,
    {
      method: 'DELETE',
      token,
    })
}
