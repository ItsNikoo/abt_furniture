'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback, useRef } from 'react'
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

  // Используем ref для хранения текущего pathname без trigger перерендера
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  // Оборачиваем checkAuth в useCallback для стабильной ссылки
  const checkAuth = useCallback(() => {
    const token = getToken()

    if (!token || isTokenExpired()) {
      setIsAuthenticated(false)
      setUser(null)
      logout()

      // Используем ref для доступа к актуальному pathname
      if (pathnameRef.current?.startsWith('/admin')) {
        router.push('/auth/login')
      }
      return
    }

    setIsAuthenticated(true)
  }, [router]) // router стабильная ссылка из Next.js

  useEffect(() => {
    checkAuth()

    const interval = setInterval(checkAuth, 30000)

    return () => clearInterval(interval)
  }, [checkAuth]) // Теперь checkAuth стабильная зависимость

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