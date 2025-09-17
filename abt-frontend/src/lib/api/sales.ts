import axios from 'axios'
import { Sale, SaleData } from '@/types'
import { apiUrl } from '@/lib/api/baseUrl'

export async function fetchSales(): Promise<Sale[]> {
  try {
    const res = await fetch(apiUrl('/sales/'), {
      // Важные настройки для избежания долгого ожидания
      signal: AbortSignal.timeout(5000), // Таймаут 5 секунд
    })

    if (!res.ok) {
      return []
    }

    return await res.json()
  } catch (error) {
    console.error('Ошибка при получении акций:', error)
    return []
  }
}

export async function deleteSale(id: string, token: string) {
  try {
    const res = await axios.delete(apiUrl(`/sales/${id}/`), {
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

    const res = await axios.patch(apiUrl(`/sales/${id}/`), formData, {
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

    const res = await axios.post(apiUrl('/sales/'), formData, {
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
