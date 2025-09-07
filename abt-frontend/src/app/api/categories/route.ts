import { NextResponse } from 'next/server'
import { apiUrl } from '@/lib/api/baseUrl'

export const revalidate = 3600 // 1 час

export async function GET() {
  try {
    const response = await fetch(apiUrl('/categories/'))

    if (!response.ok) {
      // ВАЖНО: возвращаем пустой массив вместо ошибки
      return NextResponse.json([]) // ← ИЗМЕНИЛОСЬ ЗДЕСЬ
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch {
    // ВАЖНО: возвращаем пустой массив вместо ошибки
    return NextResponse.json([]) // ← ИЗМЕНИЛОСЬ ЗДЕСЬ
  }
}
