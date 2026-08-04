import {Suspense} from 'react'
import LoadingPlaceholder from '@/components/placeholders/LoadingPlaceholder'
import {CatalogProps} from "@/components/shared/CatalogProps"
import CatalogContent from "@/components/site/Catalog/CatalogContent"
import SiteContainer from "@/components/SiteContainer"
import ReactQueryProvider from "@/providers/react-query-provider"

export default function CatalogComponent({
                                         categoriesPromise,
                                         stylesPromise,
                                         materialsPromise,
                                         selectedCategory,
                                       }: CatalogProps) {
  return (
    <ReactQueryProvider>
      <SiteContainer>
        <Suspense fallback={<div><LoadingPlaceholder/></div>}>
          <CatalogContent categoriesPromise={categoriesPromise} stylesPromise={stylesPromise}
                          materialsPromise={materialsPromise} selectedCategory={selectedCategory}/>
        </Suspense>
      </SiteContainer>
    </ReactQueryProvider>
  )
}
