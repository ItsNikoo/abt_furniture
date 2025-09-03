'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/api/auth'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPageController() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { setIsAuthenticated, setUser, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const data = await login(username, password)
      setIsAuthenticated(true)
      setUser(data.user.username)
      console.log('Вход выполнен успешно')
      router.push('/admin') // Перенаправление на страницу администратора
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Произошла неизвестная ошибка')
      }
      setIsAuthenticated(false)
      setUser(null)
    }
  }
  return (
    <div className="bg-mainGray flex flex-col items-center justify-center h-screen">
      <h1 className="text-white font-notosans mb-3">Вход</h1>
      <form className="flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md py-1 px-3 bg-white text-mainGray font-notosans text-sm"
            placeholder="Пользователь"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md py-1 px-3 bg-white text-mainGray font-notosans text-sm"
            placeholder="Пароль"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {isAuthenticated && <p className="text-green-500">Вы вошли в систему!</p>}
        <Button type="submit">Войти</Button>
      </form>
    </div>
  )
}
