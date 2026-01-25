'use server'

import { postContact } from '@/lib/api/contact'

export async function postContactAction(formData: FormData) {
  try {
    // 1. Проверка ловушечного поля
    const honeypot = formData.get('honeypot') as string
    if (honeypot && honeypot.trim() !== '') {
      console.log('Bot detected: honeypot field filled')
      return { success: false, error: 'Bot detected' }
    }

    // 2. Проверка согласия (клиентская, но можно добавить)
    const consent = formData.get('consent') === 'true'
    if (!consent) {
      return { success: false, error: 'Необходимо дать согласие на обработку данных' }
    }

    // 3. Если проверка пройдена - отправляем FormData
    await postContact(formData)
    return { success: true }

  } catch (error) {
    console.error('Ошибка в postContactAction:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    }
  }
}