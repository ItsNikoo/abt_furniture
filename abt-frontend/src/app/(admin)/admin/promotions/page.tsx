import {ADMIN_ROUTES} from "@/config/navigation"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import PromotionsGrid from "@/components/admin/promotions/PromotionsGrid"
import {Category, Material, Promotion, Style} from "@/types"
import {fetchPromotions} from "@/lib/api/promotions"
import {fetchCategories} from "@/lib/api/categories"
import {fetchStyles} from "@/lib/api/styles"
import {fetchMaterials} from "@/lib/api/materials"

export default function PromotionsPage() {
  const promotionsPromise: Promise<Promotion[]> = fetchPromotions()
  const categoriesPromise: Promise<Category[]> = fetchCategories()
  const stylesPromise: Promise<Style[]> = fetchStyles()
  const materialsPromise: Promise<Material[]> = fetchMaterials()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Специальные предложения</h1>
      <Link href={`${ADMIN_ROUTES.PROMOTIONS.path}/add`}>
        <Button>
          Добавить предложение
        </Button>
      </Link>
      <PromotionsGrid
        promotionPromise={promotionsPromise}
        categoriesPromise={categoriesPromise}
        stylesPromise={stylesPromise}
        materialsPromise={materialsPromise}
      />
    </div>
  )
}