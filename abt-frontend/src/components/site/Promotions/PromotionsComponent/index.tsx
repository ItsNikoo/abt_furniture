import { Suspense } from "react"
import {Category, Style, Material, Promotion} from "@/types"
import PromotionsContent from "@/components/site/Promotions/PromotionsContent";
import PromotionsSkeleton from "@/components/site/Promotions/PromotionSkeleton";
import SiteContainer from "@/components/SiteContainer";

interface PromotionsComponentProps {
  categories: Category[]
  styles: Style[]
  materials: Material[]
  promotions: Promotion[]
}

export default function PromotionsComponent({
                                              categories,
                                              styles,
                                              materials,
                                              promotions,
                                            }: PromotionsComponentProps) {
  return (
    <SiteContainer>
      <Suspense fallback={<PromotionsSkeleton />}>
        <PromotionsContent
          categories={categories}
          styles={styles}
          materials={materials}
          promotions={promotions}
        />
      </Suspense>
    </SiteContainer>
  )
}