import { Suspense } from "react"
import PromotionsContent from "@/components/site/Promotions/PromotionsContent";
import PromotionsSkeleton from "@/components/site/Promotions/PromotionSkeleton";
import SiteContainer from "@/components/SiteContainer";
import {PromotionProps} from "@/components/site/Promotions/PromotionProps";

export default function PromotionsComponent({
                                              categoriesPromise,
                                              stylesPromise,
                                              materialsPromise,
                                              promotionsPromise,
                                            }: PromotionProps) {
  return (
    <SiteContainer>
      <Suspense fallback={<PromotionsSkeleton />}>
        <PromotionsContent
          categoriesPromise={categoriesPromise}
          stylesPromise={stylesPromise}
          materialsPromise={materialsPromise}
          promotionsPromise={promotionsPromise}
        />
      </Suspense>
    </SiteContainer>
  )
}