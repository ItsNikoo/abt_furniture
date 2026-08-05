'use server'

import { postContact } from '@/lib/api/contact'

type PostContactResult =
  | { success: true; isBot?: boolean }
  | { success: false; error: string }

export async function postContactAction(formData: FormData): Promise<PostContactResult> {
  try {
    // 1. Проверка ловушечного поля — притворяемся успехом, чтобы не выдавать бота,
    // но помечаем isBot, чтобы фронт не учитывал это в аналитике
    const honeypot = formData.get('honeypot') as string
    if (honeypot && honeypot.trim() !== '') {
      console.log('Bot detected: honeypot field filled')
      return { success: true, isBot: true }
    }

    // 2. Проверка согласия (клиентская, но дублируем на сервере)
    const consent = formData.get('consent') === 'true'
    if (!consent) {
      return { success: false, error: 'Необходимо дать согласие на обработку данных' }
    }

    // 3. Если проверки пройдены — отправляем FormData
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