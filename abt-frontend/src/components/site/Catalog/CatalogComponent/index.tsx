import {Suspense} from 'react'
import LoadingPlaceholder from '@/components/placeholders/LoadingPlaceholder'
import {CatalogProps} from "@/components/site/Catalog/CatalogProps";
import CatalogContent from "@/components/site/Catalog/CatalogContent";
import SiteContainer from "@/components/SiteContainer";

export default function CatalogComponent({
                                         categoriesPromise,
                                         stylesPromise,
                                         materialsPromise,
                                         selectedCategory,
                                       }: CatalogProps) {
  return (
    <SiteContainer>
      <Suspense fallback={<div><LoadingPlaceholder/></div>}>
        <CatalogContent categoriesPromise={categoriesPromise} stylesPromise={stylesPromise}
                        materialsPromise={materialsPromise} selectedCategory={selectedCategory}/>
      </Suspense>
    </SiteContainer>
  )
}
