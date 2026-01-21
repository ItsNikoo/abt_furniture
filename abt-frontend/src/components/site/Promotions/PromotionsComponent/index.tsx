import {Suspense} from "react"
import PromotionsContent from "@/components/site/Promotions/PromotionsContent";
import SiteContainer from "@/components/SiteContainer";
import LoadingPlaceholder from "@/components/placeholders/LoadingPlaceholder";
import {CatalogProps} from "@/components/shared/CatalogProps";

export default function PromotionsComponent({
                                              categoriesPromise,
                                              stylesPromise,
                                              materialsPromise,
                                              selectedCategory,
                                            }: CatalogProps) {
  return (
    <SiteContainer>
      <Suspense fallback={<LoadingPlaceholder/>}>
        <PromotionsContent
          categoriesPromise={categoriesPromise}
          stylesPromise={stylesPromise}
          materialsPromise={materialsPromise}
          selectedCategory={selectedCategory}
        />
      </Suspense>
    </SiteContainer>
  )
}