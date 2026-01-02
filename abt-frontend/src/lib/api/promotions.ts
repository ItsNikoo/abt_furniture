import {Promotion, PromotionData} from "@/types";
import {apiUrl} from "@/lib/utils/baseUrl";
import axios, {AxiosError} from "axios";
import {apiRequest} from "@/lib/utils/apiRequest";

interface ApiErrorResponse {
  detail?: string
  non_field_errors?: string[]
  title?: string[]
  productSlug?: string[]
  price?: string[]
  description?: string[]
  size?: string[]
  category?: string[]
  material?: string[]
  style?: string[]
  photoFiles?: string[]
}

export async function fetchPromotions(): Promise<Promotion[]> {
  // try {
  //   const response = await fetch(apiUrl("/promotions/"), {
  //     next: {revalidate: 60}
  //   })
  //
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`)
  //   }
  //
  //   return await response.json()
  // } catch (err) {
  //   console.warn('Бэкенд недоступен, возвращаем пустой массив:', err)
  //   return []
  // }
  return apiRequest<Promotion[]>(`/promotions`, {method: "GET"})
}

// Перегрузка функции для поддержки обоих типов

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
    `/promotions`,
    {
      method: "POST",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function deletePromotion(id: number, token: string) {
  // try {
  //   const res = await axios.delete(apiUrl(`/promotions/${id}/`), {
  //     headers: {
  //       Authorization: `Token ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     withCredentials: true,
  //   })
  //
  //   return res.data
  // } catch (err) {
  //   const error = err as AxiosError<ApiErrorResponse>
  //
  //   if (error.response) {
  //     const {status, data} = error.response
  //
  //     console.error('Ошибка при удалении акционного предложения:', status, data)
  //
  //     let errorMessage = 'Не удалось удалить предложение'
  //
  //     if (data.detail) {
  //       errorMessage = data.detail
  //     } else if (status === 404) {
  //       errorMessage = 'Предложение не найдено'
  //     } else if (status === 403) {
  //       errorMessage = 'Недостаточно прав для удаления'
  //     } else if (data.non_field_errors) {
  //       errorMessage = data.non_field_errors.join(', ')
  //     }
  //
  //     throw new Error(errorMessage)
  //   } else if (error.request) {
  //     console.error('Ошибка сети при удалении предложения:', error.message)
  //     throw new Error('Проблемы с соединением')
  //   } else {
  //     console.error('Ошибка при настройке запроса:', error.message)
  //     throw new Error('Ошибка при отправке запроса')
  //   }
  // }
  return apiRequest(
    `/promotions/${id}`,
    {
      method: "DELETE", token: token
    })
}

export async function patchPromotion(id: number, data: PromotionData, token: string) {
  // try {
  //   const formData = new FormData()
  //
  //   formData.append('title', data.title)
  //   formData.append('productSlug', data.productSlug)
  //   formData.append('price', data.price.toString())
  //   formData.append('description', data.description)
  //   formData.append('size', data.size)
  //   formData.append('category', data.category)
  //
  //   if (data.material !== undefined) {
  //     if (data.material) {
  //       formData.append('material', data.material)
  //     } else {
  //       formData.append('material', '')
  //     }
  //   }
  //
  //   if (data.style !== undefined) {
  //     if (data.style) {
  //       formData.append('style', data.style)
  //     } else {
  //       formData.append('style', '')
  //     }
  //   }
  //
  //   if (data.photoFiles && data.photoFiles.length > 0) {
  //     data.photoFiles.forEach((file) => {
  //       formData.append('photoFiles', file)
  //     })
  //   }
  //
  //   if (data.deletePhotos && data.deletePhotos.length > 0) {
  //     data.deletePhotos.forEach((url) => {
  //       formData.append('deletePhotos', url)
  //     })
  //   }
  //
  //   const res = await axios.patch(apiUrl(`/promotions/${id}/`), formData, {
  //     headers: {
  //       Authorization: `Token ${token}`,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     withCredentials: true,
  //   })
  //
  //   return res.data
  // } catch (err) {
  //   const error = err as AxiosError<ApiErrorResponse>
  //
  //   if (error.response) {
  //     const {status, data} = error.response
  //
  //     console.error('Ошибка при обновлении акционного предложения:', status, data)
  //
  //     let errorMessage = 'Не удалось обновить предложение'
  //
  //     if (data.detail) {
  //       errorMessage = data.detail
  //     } else if (data.non_field_errors) {
  //       errorMessage = data.non_field_errors.join(', ')
  //     } else if (data.title) {
  //       errorMessage = `Название: ${data.title.join(', ')}`
  //     } else if (data.productSlug) {
  //       errorMessage = `Slug: ${data.productSlug.join(', ')}`
  //     } else if (data.price) {
  //       errorMessage = `Цена: ${data.price.join(', ')}`
  //     } else if (data.description) {
  //       errorMessage = `Описание: ${data.description.join(', ')}`
  //     } else if (data.size) {
  //       errorMessage = `Размер: ${data.size.join(', ')}`
  //     } else if (data.category) {
  //       errorMessage = `Категория: ${data.category.join(', ')}`
  //     } else if (data.material) {
  //       errorMessage = `Материал: ${data.material.join(', ')}`
  //     } else if (data.style) {
  //       errorMessage = `Стиль: ${data.style.join(', ')}`
  //     } else if (data.photoFiles) {
  //       errorMessage = `Фотографии: ${data.photoFiles.join(', ')}`
  //     } else if (status === 404) {
  //       errorMessage = 'Предложение не найдено'
  //     }
  //
  //     throw new Error(errorMessage)
  //   } else if (error.request) {
  //     console.error('Ошибка сети при обновлении предложения:', error.message)
  //     throw new Error('Проблемы с соединением')
  //   } else {
  //     console.error('Ошибка при настройке запроса:', error.message)
  //     throw new Error('Ошибка при отправке данных')
  //   }
  // }
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
    `/promotions`,
    {
      method: "PATCH",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}