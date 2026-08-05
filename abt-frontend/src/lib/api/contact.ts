import {Contact} from '@/types/types'
import {apiRequest} from "@/lib/utils/apiRequest"

export async function postContact(formData: FormData) {
  // Проверяем обязательные поля (дополнительная валидация)
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()

  if (!name || name.length < 2) {
    throw new Error('Имя обязательно и должно содержать минимум 2 символа')
  }
  const cleanedPhone = phone?.replace(/\D/g, '') || ''
  if (!phone || cleanedPhone.length < 11) {
    throw new Error('Введите корректный номер телефона')
  }

  // Добавляем consent если его нет (но оно должно быть)
  if (!formData.has('consent')) {
    formData.append('consent', 'true')
  }

  // Email и comment опциональны, product тоже
  const email = formData.get('email')?.toString().trim() || ''
  const comment = formData.get('comment')?.toString().trim() || ''
  const product = formData.get('product')?.toString().trim() || ''

  // Если email пустой, не добавляем (но можно добавить пустым)
  if (email) {
    formData.set('email', email)
  } else {
    formData.delete('email')  // Не отправляем пустой
  }
  formData.set('comment', comment)
  if (product) {
    formData.set('product', product)
  }

  // Файлы уже в FormData как 'photos[]' или 'photos'

  return apiRequest<Contact>(
    `/contact/`,
    {
      method: 'POST',
      data: formData,
      isFormData: true  // Важно: для multipart/form-data
    }
  )
}