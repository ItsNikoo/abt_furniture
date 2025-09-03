import axios, {AxiosError} from 'axios'
import {CategoryData} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Интерфейсы для типизации ошибок
interface ApiErrorResponse {
	detail?: string;
	category?: string[];
	category_slug?: string[];
	photo_file?: string[];
	non_field_errors?: string[];
}


export async function fetchCategories() {
	try {
		const response = await fetch(`${BASE_URL}/categories/`, {
			next: {revalidate: 60},
		})

		if (!response.ok) {
			return [];
		}

		return await response.json()
	} catch (err) {
		console.error('Ошибка при получении категорий:', err)
		return [];
	}
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
	} catch (err) {
		const error = err as AxiosError<ApiErrorResponse>

		if (error.response) {
			// Сервер вернул ошибку с кодом статуса
			const {status, data} = error.response

			console.error('Ошибка при добавлении категории:', status, data)

			// Формируем понятное сообщение об ошибке
			let errorMessage = 'Не удалось добавить категорию'

			if (data.detail) {
				errorMessage = data.detail
			} else if (data.non_field_errors) {
				errorMessage = data.non_field_errors.join(', ')
			} else if (data.category) {
				errorMessage = `Категория: ${data.category.join(', ')}`
			} else if (data.category_slug) {
				errorMessage = `Slug категории: ${data.category_slug.join(', ')}`
			} else if (data.photo_file) {
				errorMessage = `Фото: ${data.photo_file.join(', ')}`
			}

			throw new Error(errorMessage)
		} else if (error.request) {
			// Запрос был сделан, но ответ не получен
			console.error('Ошибка сети при добавлении категории:', error.message)
			throw new Error('Проблемы с соединением. Проверьте интернет и попробуйте снова.')
		} else {
			// Что-то пошло не так при настройке запроса
			console.error('Ошибка при настройке запроса:', error.message)
			throw new Error('Ошибка при отправке данных')
		}
	}
}

export async function deleteCategory(id: number, token: string) {
	try {
		const res = await axios.delete(`${BASE_URL}/categories/${id}/`, {
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})

		return res.data
	} catch (err) {
		const error = err as AxiosError<ApiErrorResponse>

		if (error.response) {
			const {status, data} = error.response

			console.error('Ошибка при удалении категории:', status, data)

			let errorMessage = 'Не удалось удалить категорию'
			if (data.detail) {
				errorMessage = data.detail
			} else if (status === 404) {
				errorMessage = 'Категория не найдена'
			} else if (status === 403) {
				errorMessage = 'Недостаточно прав для удаления'
			}

			throw new Error(errorMessage)
		} else if (error.request) {
			console.error('Ошибка сети при удалении категории:', error.message)
			throw new Error('Проблемы с соединением')
		} else {
			console.error('Ошибка при настройке запроса:', error.message)
			throw new Error('Ошибка при отправке запроса')
		}
	}
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
	} catch (err) {
		const error = err as AxiosError<ApiErrorResponse>

		if (error.response) {
			const {status, data} = error.response

			console.error('Ошибка при обновлении категории:', status, data)

			let errorMessage = 'Не удалось обновить категорию'

			if (data.detail) {
				errorMessage = data.detail
			} else if (data.non_field_errors) {
				errorMessage = data.non_field_errors.join(', ')
			} else if (data.category) {
				errorMessage = `Категория: ${data.category.join(', ')}`
			} else if (data.category_slug) {
				errorMessage = `Slug категории: ${data.category_slug.join(', ')}`
			} else if (data.photo_file) {
				errorMessage = `Фото: ${data.photo_file.join(', ')}`
			} else if (status === 404) {
				errorMessage = 'Категория не найдена'
			}

			throw new Error(errorMessage)
		} else if (error.request) {
			console.error('Ошибка сети при обновлении категории:', error.message)
			throw new Error('Проблемы с соединением')
		} else {
			console.error('Ошибка при настройке запроса:', error.message)
			throw new Error('Ошибка при отправке данных')
		}
	}
}