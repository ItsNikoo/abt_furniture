import {fetchCategories} from "@/lib/api/categories";
import {fetchStyles} from "@/lib/api/styles";
import {fetchMaterials} from "@/lib/api/materials";
import PromotionsComponent from "@/components/site/Promotions/PromotionsComponent";

interface Props{
  params: Promise<{ categorySlug: string }>;
}

export default async function SaleCategoryPage({params}: Props) {
  const {categorySlug} = await params
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return(
    <PromotionsComponent
      categoriesPromise={categoriesPromise}
      stylesPromise={stylesPromise}
      materialsPromise={materialsPromise}
      selectedCategory={categorySlug}
    />
  )
}