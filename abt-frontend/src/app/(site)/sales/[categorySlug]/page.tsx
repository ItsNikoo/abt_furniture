import {fetchCategories} from "@/lib/api/categories"
import {fetchStyles} from "@/lib/api/styles"
import {fetchMaterials} from "@/lib/api/materials"
import PromotionsComponent from "@/components/site/Promotions/PromotionsComponent"
import {Metadata} from 'next'
import {Category} from "@/types" // Assuming Category type exists

interface Props{
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {categorySlug} = await params
  const categories = await fetchCategories()

  // Находим текущую категорию
  const category: Category | undefined = categories.find((cat: Category) => cat.categorySlug === categorySlug)

  if (!category) {
    return {
      title: 'Категория не найдена | АБТ мебель',
      description: 'Запрашиваемая категория не найдена.',
    }
  }

  // Генерируем динамические мета-данные
  const title = `Готовые решения в категории${category.category} | Каталог мебели АБТ`
  const description = `Готовые ${category.category} на заказ от фабрики АБТ мебель. Качественная мебель на заказ с индивидуальным дизайном и быстрой доставкой.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ru_RU',
      url: `https://kuhni-abt.ru/sales/${categorySlug}`,
      siteName: 'АБТ мебель',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    }
  }
}

export const revalidate = 60

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