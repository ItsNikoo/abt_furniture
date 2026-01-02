'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getToken, isTokenExpired, logout } from '@/lib/utils/auth'

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  user: string | null
  setUser: (user: string | null) => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Проверка токена при монтировании и каждые 30 секунд
  const checkAuth = () => {
    const token = getToken()

    if (!token || isTokenExpired()) {
      setIsAuthenticated(false)
      setUser(null)
      logout()

      // Если пользователь на защищенной странице - редирект на логин
      if (pathname?.startsWith('/admin')) {
        router.push('/auth/login')
      }
      return
    }

    setIsAuthenticated(true)
  }

  useEffect(() => {
    checkAuth()

    const interval = setInterval(checkAuth, 30000)

    return () => clearInterval(interval)
  }, [pathname])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}