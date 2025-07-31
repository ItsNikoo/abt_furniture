import axios from 'axios'
import {ProductData} from '@/types'
import axiosInstance from "@/lib/axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchProducts(filters: { category?: string, style?: string, material?: string } = {}) {
  try {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.style) params.append('style', filters.style)
    if (filters.material) params.append('material', filters.material)

    const url = `${BASE_URL}/products/?${params.toString()}`
    const res = await fetch(url, {
      next: {revalidate: 60},
    })
    return res.json()
  } catch (error: any) {
    throw new Error(`Непредвиденная ошибка в GET запросе продуктов`);
  }
}

export async function fetchProductById(id: number) {
  const res = await fetch(`${BASE_URL}/products/${id}/`, {
    next: {revalidate: 60},
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

    const response = await axios.post(`${BASE_URL}/products/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при добавлении продукта:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Ошибка при добавлении продукта')
    }
    console.error('Неизвестная ошибка:', error)
    throw new Error('Неизвестная ошибка при добавлении продукта')
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

    const response = await axios.patch(`${BASE_URL}/products/${id}/`, formData, {
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
  const response = await axios.delete(`${BASE_URL}/products/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  return response.status
}
