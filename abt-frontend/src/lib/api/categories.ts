import axios from 'axios'
import {CategoryData} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories/`, {
    next: {revalidate: 60},
  })
  return res.json()
}

export async function postCategory(data: CategoryData, token: string) {
  try {
    const formData = new FormData()
    formData.append('category_slug', data.categorySlug)
    formData.append('category', data.category)
    if (data.photoFile) {
      formData.append('photo_file', data.photoFile)
    }
    const res = await axios.post(`${BASE_URL}/categories/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    return res.data
  } catch (err: any) {
    if (err.response) {
      console.log('Ошибка при добавлении категории:', err.response.data)
      throw err.response.data // прокинуть дальше
    } else {
      console.log('Ошибка при добавлении категории:', err.message)
      throw new Error(err.message)
    }
  }
}


export async function deleteCategory(id: number, token: string) {
  const res = await axios.delete(`${BASE_URL}/categories/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  return res.data
}

export async function patchCategory(id: number, data: CategoryData, token: string) {
  try {
    const formData = new FormData()
    formData.append('category', data.category)
    formData.append('category_slug', data.categorySlug)
    if (data.photoFile) {
      formData.append('photo_file', data.photoFile)
    }

    const res = await axios.patch(`${BASE_URL}/categories/${id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Детали ошибки:', {
        status: error.response?.status,
        data: error.response?.data, // Важно: тут будет сообщение от Django
      })
    }
    throw error
  }
}
