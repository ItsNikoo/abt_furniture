import { fetchCategories } from '@/lib/api/categories'
import Catalog from '../../../../components/site/Catalog'
import ContentWrapper from '@/components/ContentWrapper'
import {fetchStyles} from "@/lib/api/styles"
import {fetchMaterials} from "@/lib/api/materials"

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return (
    <ContentWrapper>
      <Catalog
        categoriesPromise={categoriesPromise}
        selectedCategory={categorySlug}
        stylesPromise={stylesPromise}
        materialsPromise={materialsPromise}
      />
    </ContentWrapper>
  )
}