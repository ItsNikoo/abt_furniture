import MainGridContainer from '@/components/admin/products/MainGridContainer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Панель продуктов</h1>
      <Button>
        <Link href={'/admin/products/add'}>
          Добавить товар
        </Link>
      </Button>
      <MainGridContainer/>
    </div>
  )
}
