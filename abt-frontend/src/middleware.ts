import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  if (req.nextUrl.pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Если токен есть — пропускаем на /admin или другие страницы
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
