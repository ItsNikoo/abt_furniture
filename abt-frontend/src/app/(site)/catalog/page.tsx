import ContentWrapper from '@/components/ContentWrapper'
import Catalog from '../../../components/site/Catalog'
import { fetchCategories } from '@/lib/api/categories'
import { fetchStyles } from '@/lib/api/styles'
import { fetchMaterials } from '@/lib/api/materials'

export async function generateMetadata() {
  return {
    title: 'Каталог мебели | Абт мебель',
    description: 'Ознакомьтесь с нашим обширным каталогом мебели, включая кухни, шкафы и многое другое. Высокое качество и стильный дизайн от АБТ.',
    openGraph: {
      title: 'Каталог мебели | АБТ мебель',
      description: 'АБТ мебель — мебельная компания, объединяющая качество, стиль и заботу о клиентах.',
      url: 'https://abt-furniture.ru/catalog',
      siteName: 'АБТ мебель',
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export const dynamic = 'force-dynamic' // Отключает статическую генерацию
export const revalidate = 0 // Отключает кэширование

export default function CatalogPage() {
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return (
    <ContentWrapper>
      <Catalog categoriesPromise={categoriesPromise} stylesPromise={stylesPromise} materialsPromise={materialsPromise}/>
    </ContentWrapper>
  )
}
