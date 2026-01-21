import {fetchCategories} from '@/lib/api/categories'
import {fetchStyles} from '@/lib/api/styles'
import {fetchMaterials} from '@/lib/api/materials'
import {Category} from "@/types"
import CatalogComponent from "../../../../components/site/Catalog/CatalogComponent";

interface Props{
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({params}: Props) {
  const {categorySlug} = await params
  const categories = await fetchCategories()

  // Находим текущую категорию
  const category: Category | undefined = categories.find((cat: Category) => cat.categorySlug === categorySlug)

  // Fallback если категория не найдена
  if (!category) {
    return {
      title: 'Категория не найдена | АБТ мебель',
      description: 'Запрашиваемая категория не найдена.',
    }
  }

  // Генерируем динамические мета-данные
  const title = `${category.category} | Каталог мебели АБТ`
  const description = `${category.category} на заказ от фабрики АБТ мебель. Качественная мебель на заказ с индивидуальным дизайном и быстрой доставкой.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ru_RU',
      url: `https://kuhni-abt.ru/catalog/${categorySlug}`,
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

export default async function ProductCategoryPage({params}: Props) {
  const {categorySlug} = await params
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return (
    <CatalogComponent categoriesPromise={categoriesPromise} stylesPromise={stylesPromise}
                      materialsPromise={materialsPromise} selectedCategory={categorySlug} />
  )
}
