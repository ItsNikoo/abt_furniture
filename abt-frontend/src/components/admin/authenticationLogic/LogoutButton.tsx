'use client'

import React from 'react'
import Cookies from 'js-cookie'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { setIsAuthenticated, setUser } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    // Удаляем токен из куки
    Cookies.remove('token')

    // Обнуляем состояние аутентификации
    setIsAuthenticated(false)
    setUser(null)

    // Редиректим на страницу логина (или куда нужно)
    router.push('/auth/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-mainGray text-white rounded text-sm font-notosans"
    >
      Выход
    </button>
  )
}
