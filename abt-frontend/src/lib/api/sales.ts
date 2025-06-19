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

export async function deleteSale(id: string) {
  try {
    const res = await axios.delete(`${BASE_URL}/sales/${id}/`)
    if (res.status !== 204) {
      throw new Error('Ошибка при удалении акции')
    }
  } catch (error) {
    console.error('Ошибка при удалении акции:', error)
    throw new Error('Не удалось удалить акцию')
  }
}

export async function patchSale(id: string, data: SaleData) {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('link', data.link)
    if (data.photoFile) {
      formData.append('photoFile', data.photoFile)
    }

    const res = await axios.patch(`${BASE_URL}/sales/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res.data
  } catch (error) {
    console.error('Ошибка при обновлении акции:', error)
    throw new Error('Не удалось обновить акцию')
  }
}

export async function postSale(data: SaleData) {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.photoFile) {
      formData.append('photoFile', data.photoFile)
    }
    formData.append('link', data.link)

    const res = await axios.post(`${BASE_URL}/sales/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (error) {
    console.error('Ошибка при создании акции:', error)
    throw new Error('Не удалось создать акцию')
  }
}
