import ContentWrapper from '@/components/ContentWrapper'
import Catalog from '../../../components/site/Catalog'
import { fetchCategories } from '@/lib/api/categories'
import {fetchStyles} from "@/lib/api/styles";
import {fetchMaterials} from "@/lib/api/materials";

export default function CatalogPage() {
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return (
    <ContentWrapper>
      <Catalog categoriesPromise={categoriesPromise} stylesPromise={stylesPromise} materialsPromise={materialsPromise} />
    </ContentWrapper>
  )
}
