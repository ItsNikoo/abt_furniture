import Link from 'next/link'
import {Button} from '@/components/ui/button'
import LogoutButton from '@/components/admin/authenticationLogic/LogoutButton'
import {ADMIN_ROUTES} from "@/config/navigation";

export default function AdminLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="my-8 mx-[100px]">
      <div className="flex items-center my-2.5 pb-5 border-b-2 gap-5">
        <h1 className="text-2xl font-bold">Админ-панель</h1>
        <LogoutButton/>
      </div>
      <div className="flex gap-4">
        <nav className="min-w-[200px] pr-5 border-r">
          <ul className="flex flex-col gap-2">
            {Object.values(ADMIN_ROUTES).map((item, index) => (
              <Link href={item.path} key={index}>
                <Button size={"lg"} variant={"secondary"} className="w-full">
                  {item.name}
                </Button>
              </Link>
            ))}
          </ul>
        </nav>
        <main className="flex-1 p-3">
          {children}
        </main>
      </div>
    </div>
  )
}
