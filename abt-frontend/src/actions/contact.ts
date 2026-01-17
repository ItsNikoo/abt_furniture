'use server'

import { postContact } from '@/lib/api/contact'

export async function postContactAction(
  name: string,
  phone: string,
  comment: string,
  consent: boolean,
  product?: string,
  honeypot?: string,   // Ловушечное поле
) {
  try {
    // 1. Проверка ловушечного поля
    if (honeypot && honeypot.trim() !== '') {
      console.log('Bot detected: honeypot field filled')
      return { success: false, error: 'Bot detected' }
    }

    // 2. Если проверка пройдена - отправляем данные
    await postContact({name, phone, comment, consent, product })
    return { success: true }

  } catch (error) {
    console.error('Ошибка в postContactAction:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    }
  }
}
