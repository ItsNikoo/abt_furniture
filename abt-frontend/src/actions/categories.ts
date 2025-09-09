'use server'

import axios, { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import { CategoryData } from '@/types'

// Direct backend URL for server-side calls (not through nginx proxy)
const BACKEND_URL = process.env.API_URL || 'http://backend:8000/api'

interface ApiErrorResponse {
  detail?: string;
  category?: string[];
  category_slug?: string[];
  photo_file?: string[];
  non_field_errors?: string[];
}

export async function deleteCategoryAction(id: number, token: string) {
  try {
    await axios.delete(`${BACKEND_URL}/categories/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    })

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>
    console.error('Delete category error:', error.message)

    let errorMessage = 'Не удалось удалить категорию'
    if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail
    }

    throw new Error(errorMessage)
  }
}

export async function patchCategoryAction(id: number, data: CategoryData, token: string) {
  try {
    const formData = new FormData()
    formData.append('category', data.category)
    formData.append('category_slug', data.categorySlug)

    if (data.photoFile) {
      formData.append('photo_file', data.photoFile)
    }

    await axios.patch(`${BACKEND_URL}/categories/${id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    })

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>
    console.error('Patch category error:', error.message)

    let errorMessage = 'Не удалось обновить категорию'
    if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail
    }

    throw new Error(errorMessage)
  }
}

export async function postCategoryAction(data: CategoryData, token: string) {
  try {
    const api_url = `${BACKEND_URL}/categories/`
    console.log('Posting to URL:', api_url)

    const formData = new FormData()
    formData.append('category_slug', data.categorySlug)
    formData.append('category', data.category)

    if (data.photoFile) {
      formData.append('photo_file', data.photoFile)
    }

    const response = await axios.post(`${BACKEND_URL}/categories/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    })
    console.log("Success:", response.status)

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>
    console.error('Post category error:', error.message)

    let errorMessage = 'Не удалось добавить категорию'
    if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail
    } else if (error.response?.data?.non_field_errors) {
      errorMessage = error.response.data.non_field_errors.join(', ')
    }

    throw new Error(errorMessage)
  }
}