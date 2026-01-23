import { fetchCategories } from "@/lib/api/categories"
import { fetchStyles } from "@/lib/api/styles"
import { fetchMaterials } from "@/lib/api/materials"
import PromotionsComponent from "@/components/site/Promotions/PromotionsComponent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Готовые решения | Кухни АБТ',
  description: 'Актуальные акции и готовые предложения на кухни и мебель на заказ. Эти решения помогут тем, кто не хочет индивидуальный проект',
  keywords: 'акции на кухни, скидки на мебель, спецпредложения кухни москва',
  openGraph: {
    title: 'Спецпредложения на кухни и мебель от производителя АБТ',
    description: 'Актуальные акции и специальные предложения на кухни на заказ. Скидки до 30%. Бесплатный замер и дизайн-проект от АБТ.',
    images: [],
    siteName: 'АБТ мебель',
    locale: 'ru_RU',
    type: 'website',
    url: 'https://kuhni-abt.ru/sales/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default async function SalesPage() {
  const categoriesPromise = fetchCategories();
  const stylesPromise = fetchStyles();
  const materialsPromise = fetchMaterials();

  return (
    <PromotionsComponent
      categoriesPromise={categoriesPromise}
      stylesPromise={stylesPromise}
      materialsPromise={materialsPromise}
    />
  )
}