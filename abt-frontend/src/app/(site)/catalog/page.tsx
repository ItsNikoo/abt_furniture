import {fetchCategories} from '@/lib/api/categories'
import {fetchStyles} from '@/lib/api/styles'
import {fetchMaterials} from '@/lib/api/materials'
import CatalogComponent from "../../../components/site/Catalog/CatalogComponent"
import {Metadata} from "next"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Каталог мебели | АБТ мебель',
    description: 'Ознакомьтесь с нашим обширным каталогом мебели, включая кухни, шкафы и многое другое. Высокое качество и стильный дизайн от АБТ.',
    keywords: [
      "кухня сайт каталоги",
      "каталог кухонь москва",
      "кухни каталог москва цены",
      "каталог готовых кухонь",
      "абт кухни",
      "кухни абт",
      "кухни абт каталог",
      "купить угловую кухню в москве"
    ],
    openGraph: {
      title: 'Каталог мебели | АБТ мебель',
      description: 'АБТ мебель — мебельная компания, объединяющая качество, стиль и заботу о клиентах.',
      url: 'https://kuhni-abt.ru/catalog',
      siteName: 'АБТ мебель',
      locale: 'ru_RU',
      type: 'website',
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

export default function CatalogPage() {
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return (
    <CatalogComponent categoriesPromise={categoriesPromise} stylesPromise={stylesPromise}
                      materialsPromise={materialsPromise}/>
  )
}
