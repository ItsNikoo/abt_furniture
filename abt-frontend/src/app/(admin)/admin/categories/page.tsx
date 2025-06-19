import CategoriesBar from '@/components/admin/categories/CategoriesBar'
import AddCategoryContainer from '@/components/admin/categories/AddCategoryContainer'
import { fetchCategories } from '@/lib/api/categories'

export default function CategoriesPage() {
  const categoriesPromise = fetchCategories()
  return (
    <>
      <AddCategoryContainer/>
      <CategoriesBar promise={categoriesPromise}/>
    </>
  )
}
