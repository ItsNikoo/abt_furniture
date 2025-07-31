import axios from 'axios'
import { SaleData } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchSales() {
  try {
    const res = await fetch(`${BASE_URL}/sales/`)
    return res.json()
  } catch (error) {
    console.error('Ошибка при получении акций:', error)
    throw new Error('Не удалось загрузить акции')
  }
}

export async function deleteSale(id: string, token: string) {
  try {
    const res = await axios.delete(`${BASE_URL}/sales/${id}/`,{
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    if (res.status !== 204) {
      throw new Error('Ошибка при удалении акции')
    }
  } catch (error) {
    console.error('Ошибка при удалении акции:', error)
    throw new Error('Не удалось удалить акцию')
  }
}

export async function patchSale(id: string, data: SaleData, token: string) {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('link', data.link)
    if (data.photoFile) {
      formData.append('photo_file', data.photoFile)
    }

    const res = await axios.patch(`${BASE_URL}/sales/${id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })

    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message)
    } else {
      console.error('Unknown error:', error)
    }
    throw new Error('Не удалось обновить акцию')
  }
}

export async function postSale(data: SaleData, token: string) {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.photoFile) {
      formData.append('photo_file', data.photoFile)
    }
    formData.append('link', data.link)

    const res = await axios.post(`${BASE_URL}/sales/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.error('Ошибка при создании акции:', error)
    throw new Error('Не удалось создать акцию')
  }
}
