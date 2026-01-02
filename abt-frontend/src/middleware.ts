import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')
  const tokenExpiresAt = req.cookies.get('tokenExpiresAt')

  if (req.nextUrl.pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Проверяем истечение токена
  if (req.nextUrl.pathname.startsWith('/admin') && tokenExpiresAt) {
    const expiresAt = new Date(tokenExpiresAt.value)
    const now = new Date()

    if (now >= expiresAt) {
      // Токен истек - редирект на логин и удаляем cookies
      const loginUrl = new URL('/auth/login', req.url)
      const response = NextResponse.redirect(loginUrl)

      response.cookies.delete('token')
      response.cookies.delete('tokenExpiresAt')

      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}