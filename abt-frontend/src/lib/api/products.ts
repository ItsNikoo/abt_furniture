import axios from 'axios'
import { ProductData } from '@/types'
import { apiUrl } from '@/lib/api/baseUrl'

export async function fetchProducts(filters: { category?: string; style?: string; material?: string } = {}) {
  try {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.style) params.append('style', filters.style)
    if (filters.material) params.append('material', filters.material)

    const url = `${apiUrl('/products/')}${params.toString() ? `?${params.toString()}` : ''}`
    const res = await fetch(url, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      // Обрабатываем HTTP ошибки
      throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error) {
    // Правильная обработка ошибок с TypeScript
    if (error instanceof Error) {
      console.error('Ошибка при получении продуктов:', error.message)
      throw new Error(`Не удалось загрузить продукты: ${error.message}`)
    } else {
      console.error('Неизвестная ошибка при получении продуктов:', error)
      throw new Error('Произошла неизвестная ошибка при загрузке продуктов')
    }
  }
}

export async function fetchProductById(id: number) {
  const res = await fetch(apiUrl(`/products/${id}/`), {
    next: { revalidate: 60 },
  })
  return res.json()
}

export async function postProduct(data: ProductData, token: string) {
  try {
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
        formData.append(`photo_files`, file)
      })
    }

    const response = await fetch(apiUrl('/products/'), {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Token ${token}`, // Fixed: Changed from Bearer to Token
      },
    })

    // Add proper error handling
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw {
        response: { data: errorData },
        message: `HTTP ${response.status}: ${response.statusText}`
      }
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error)
    throw error // Let the component handle the error
  }
}

export async function patchProduct(data: ProductData, id: number, token: string) {
  try {
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
        formData.append('delete_photos', url) // Добавляем каждый URL отдельно
      })
    }

    if (data.photoFiles && data.photoFiles.length > 0) {
      data.photoFiles.forEach((file) => {
        formData.append(`photo_files`, file)
      })
    }

    const response = await axios.patch(apiUrl(`/products/${id}/`), formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    console.log('Ответ от сервера:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при редактировании продукта:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Ошибка при редактировании продукта')
    }
    console.error('Неизвестная ошибка:', error)
    throw new Error('Неизвестная ошибка при редактировании продукта')
  }
}

export async function deleteProduct(id: number, token: string) {
  const response = await axios.delete(apiUrl(`/products/${id}/`), {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  return response.status
}
