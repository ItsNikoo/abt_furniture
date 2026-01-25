'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/lib/utils/auth'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { setIsAuthenticated, setUser } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <Button onClick={handleLogout} variant="secondary">
      Выйти
    </Button>
  )
}