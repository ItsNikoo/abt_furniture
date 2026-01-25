import {Category, Material, Promotion, Style} from "@/types"
import {use} from "react"
import PromotionCard from "@/components/admin/promotions/PromotionCard"

interface PromotionCardProps {
  promotionPromise: Promise<Promotion[]>,
  categoriesPromise: Promise<Category[]>,
  stylesPromise: Promise<Style[]>,
  materialsPromise: Promise<Material[]>
}

export default function PromotionsGrid({promotionPromise, categoriesPromise, stylesPromise, materialsPromise}: PromotionCardProps) {
  const data = use(promotionPromise)
  const categories = use(categoriesPromise)
  const styles = use(stylesPromise)
  const materials = use(materialsPromise)

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        {data?.map((promotion: Promotion) => (
          <div key={promotion.id} className="mt-3">
            <PromotionCard
              promotion={promotion}
              categories={categories}
              styles={styles}
              materials={materials}
            />
          </div>
        ))}
      </div>
    </div>
  )
}