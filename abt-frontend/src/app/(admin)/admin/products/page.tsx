import MainGridContainer from '@/components/admin/products/MainGridContainer'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {ADMIN_ROUTES} from "@/config/navigation"

export const dynamic = 'force-dynamic' // Отключает статическую генерацию
export const revalidate = 0 // Отключает кэширование

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Панель продуктов</h1>
      <Link href={`${ADMIN_ROUTES.PRODUCTS.path}/add`}>
        <Button>
          Добавить товар
        </Button>
      </Link>
      <MainGridContainer/>
    </div>
  )
}
