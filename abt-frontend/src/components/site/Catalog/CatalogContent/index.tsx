'use client'

import {CatalogProps} from "@/components/shared/CatalogProps"
import BaseCatalogContent from "@/components/shared/BaseCatalogContent"
import {fetchProductById, fetchProducts} from "@/lib/api/products"
import CatalogCard from "@/components/site/Catalog/CatalogCard"


export default function CatalogContent(
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
      title="Каталог"
      basePath="/catalog"
      fetchFn={fetchProducts}
      queryKeyPrefix="products"
      renderCard={(product) => <CatalogCard entity={product}/>}
      getItemLink={(product, categorySlug) =>
        `/catalog/${categorySlug}/${product.id}-${product.productSlug}`
      }
      prefetchItem={fetchProductById}
    />
  )
}