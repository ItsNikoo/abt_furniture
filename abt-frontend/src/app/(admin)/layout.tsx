import { AuthProvider } from '@/context/AuthContext'
import AutoLogoutTimer from '@/components/admin/authenticationLogic/AutoLogoutTimer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AutoLogoutTimer/>
      <main>{children}</main>
    </AuthProvider>
  )
}
