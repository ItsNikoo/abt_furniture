import {fetchCategories} from '@/lib/api/categories'
import {fetchStyles} from '@/lib/api/styles'
import {fetchMaterials} from '@/lib/api/materials'
import CatalogComponent from "@/components/site/pages/Catalog/CatalogComponent"
import {Metadata} from "next"
import FeedbackForm from "@/components/site/FeedbackForm"
import SiteContainer from "@/components/SiteContainer"
import KitchensPage from "@/components/site/pages/Kitchens/KitchensPage"
import LoadingPlaceholder from "@/components/placeholders/LoadingPlaceholder"
import LazyMount from "@/components/shared/LazyMount"

export const revalidate = 60
// export const dynamic = 'force-dynamic'

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
      images: [
        {
          url: 'https://kuhni-abt.ru/seo-image.jpg',
          width: 1200,
          height: 630,
          alt: 'АБТ мебель — кухни и мебель на заказ от производителя',
        },
      ],
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
    <>
      <KitchensPage/>
      <LazyMount
        fallback={<LoadingPlaceholder/>}
        rootMargin={"0px 0px 600px 0px"}
      >
        <CatalogComponent
          categoriesPromise={categoriesPromise}
          stylesPromise={stylesPromise}
          materialsPromise={materialsPromise}
        />
      </LazyMount>
      <SiteContainer className="mt-4">
        <FeedbackForm/>
      </SiteContainer>
    </>
  )
}
