import ContentWrapper from "@/components/ContentWrapper"
import { fetchCategories } from "@/lib/api/categories"
import { fetchStyles } from "@/lib/api/styles"
import { fetchMaterials } from "@/lib/api/materials"
import PromotionsComponent from "@/components/site/Promotions/PromotionsComponent"
import { Metadata } from "next"
import {fetchPromotions} from "@/lib/api/promotions";

export const metadata: Metadata = {
  title: 'Спецпредложения на кухни и мебель | Кухни АБТ',
  description: 'Актуальные акции и специальные предложения на кухни на заказ. Скидки до 30%. Бесплатный замер и дизайн-проект.',
  keywords: 'акции на кухни, скидки на мебель, спецпредложения кухни москва',
}

export default async function PromotionsPage() {
  const categoriesPromise = fetchCategories();
  const stylesPromise = fetchStyles();
  const materialsPromise = fetchMaterials();
  const promotionsPromise = fetchPromotions();

  return (
    <ContentWrapper>
      <PromotionsComponent
        categoriesPromise={categoriesPromise}
        stylesPromise={stylesPromise}
        materialsPromise={materialsPromise}
        promotionsPromise={promotionsPromise}
      />
    </ContentWrapper>
  )
}