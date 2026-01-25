import AddPromotionContainer from "@/components/admin/promotions/AddPromotionContainer"
import {Category, Material, Style} from "@/types"
import {fetchCategories} from "@/lib/api/categories"
import {fetchStyles} from "@/lib/api/styles"
import {fetchMaterials} from "@/lib/api/materials"

export const dynamic = 'force-dynamic'

export default async function AddPromotionPage() {
  const categories: Category[] = await fetchCategories()
  const styles: Style[] = await fetchStyles()
  const materials: Material[] = await fetchMaterials()
  
  return (
    <AddPromotionContainer categories={categories} styles={styles} materials={materials} />
  )
}
