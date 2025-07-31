import ReactQueryProvider from '../(site)/react-query-provider'
import {AuthProvider} from "@/context/AuthContext"
import AutoLogoutTimer from "@/components/admin/authenticationLogic/AutoLogoutTimer";

export default function AdminLayout({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <AutoLogoutTimer />
        <main>{children}</main>
      </ReactQueryProvider>
    </AuthProvider>
  )
}
