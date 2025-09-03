import CategoriesBar from '@/components/admin/categories/CategoriesBar'
import AddCategoryContainer from '@/components/admin/categories/AddCategoryContainer'
import { fetchCategories } from '@/lib/api/categories'

export const dynamic = 'force-dynamic' // Отключает статическую генерацию
export const revalidate = 0 // Отключает кэширование

export default function CategoriesPage() {
  const categoriesPromise = fetchCategories()
  return (
    <>
      <AddCategoryContainer/>
      <CategoriesBar promise={categoriesPromise}/>
    </>
  )
}
