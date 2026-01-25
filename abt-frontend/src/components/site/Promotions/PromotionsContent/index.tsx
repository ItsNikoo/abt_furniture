'use client'

import {CatalogProps} from "@/components/shared/CatalogProps"
import BaseCatalogContent from "@/components/shared/BaseCatalogContent"
import {fetchPromotionById, fetchPromotions} from "@/lib/api/promotions"
import CatalogCard from "@/components/shared/CatalogCard"

export default function PromotionsContent(
  {
    categoriesPromise,
    stylesPromise,
    materialsPromise,
    selectedCategory
  }: CatalogProps) {
  return (
    <BaseCatalogContent
      categoriesPromise={categoriesPromise}
      stylesPromise={stylesPromise}
      materialsPromise={materialsPromise}
      selectedCategory={selectedCategory}
      title={"Готовые решения"}
      basePath={"/sales"}
      fetchFn={fetchPromotions}
      queryKeyPrefix={"sales"}
      renderCard={(promotion) => <CatalogCard isPromotion={true} entity={promotion}/>}
      getItemLink={(promotion, categorySlug) =>
        `/sales/${categorySlug}/${promotion.id}-${promotion.productSlug}`
      }
      prefetchItem={fetchPromotionById}
    />
  )
}