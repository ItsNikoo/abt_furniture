'use client'

import { useEffect } from 'react'
import { logout } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function AutoLogoutTimer() {
  const router = useRouter()
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    // Таймер на 30 минут (в мс)
    const timeout = setTimeout(() => {
      logout() // удаляет токен из куки
      setIsAuthenticated(false)
      setUser(null)
      router.push('/auth/login')
    }, 30 * 60 * 1000)

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timeout)
  }, [isAuthenticated, router, setIsAuthenticated, setUser])

  return null // ничего не рендерим
}
