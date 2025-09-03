import AddProductContainer from '@/components/admin/products/AddProductContainer'
import { Category, Material, Style } from '@/types'
import { fetchCategories } from '@/lib/api/categories'
import { fetchStyles } from '@/lib/api/styles'
import { fetchMaterials } from '@/lib/api/materials'

export const dynamic = 'force-dynamic' // Отключает статическую генерацию
export const revalidate = 0 // Отключает кэширование

export default async function AddProductPage() {
  const categories: Category[] = await fetchCategories()
  const styles: Style[] = await fetchStyles()
  const materials: Material[] = await fetchMaterials()

  return (
    <>
      <AddProductContainer categories={categories} styles={styles} materials={materials}/>
    </>
  )
}
