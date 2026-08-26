import {fetchCategories} from '@/lib/api/categories'
import {fetchStyles} from '@/lib/api/styles'
import {fetchMaterials} from '@/lib/api/materials'
import {Category} from "@/types/types"
import CatalogComponent from "@/components/site/pages/Catalog/CatalogComponent"
import {Metadata} from "next"
import KitchensPage from "@/components/site/pages/Kitchens/KitchensPage"
import WardrobesPage from "@/components/site/pages/Wardrobes/WardrobesPage"
import FeedbackForm from "@/components/site/FeedbackForm"
import SiteContainer from "@/components/SiteContainer"
import HallwaysPage from "@/components/site/pages/Hallways/HallwaysPage"
import ReviewsContainer from "@/components/site/Reviews/ReviewsContainer"

interface Props {
  params: Promise<{ categorySlug: string }>
}

const CATEGORY_PAGES: Record<string, React.ComponentType> = {
  kitchens: KitchensPage,
  closets: WardrobesPage,
  prihozjie: HallwaysPage,
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {categorySlug} = await params
  const categories = await fetchCategories()

  // Находим текущую категорию
  const category: Category | undefined = categories.find((cat: Category) => cat.categorySlug === categorySlug)

  // Fallback если категория не найдена
  if (!category) {
    return {
      title: 'Категория не найдена | АБТ мебель',
      description: 'Запрашиваемая категория не найдена.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${category.category} на заказ в Москве | АБТ мебель`
  const description = `${category.category} на заказ от фабрики АБТ мебель. Качественная мебель с индивидуальным дизайном, собственное производство, быстрая доставка по Москве и МО. Гарантия качества`

  const keywords = [
    category.category.toLowerCase(),
    `${category.category.toLowerCase()} на заказ`,
    `${category.category.toLowerCase()} москва`,
    `${category.category.toLowerCase()} на заказ москва`,
    `${category.category.toLowerCase()} на заказ недорого`,
    'мебель на заказ',
    'абт кухни',
    'кухни абт',
    'мебель москва',
    'индивидуальная мебель',
    'мебель по размерам',
  ]

  const url = `https://kuhni-abt.ru/catalog/${categorySlug}`

  return {
    title,
    description,
    keywords: keywords.join(', '),

    // Канонический URL для избежания дублирования
    alternates: {
      canonical: url,
    },

    // Open Graph для социальных сетей
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ru_RU',
      url,
      siteName: 'АБТ мебель - Фабрика мебели на заказ',
      images: [
        {
          url: 'https://kuhni-abt.ru/seo-image.jpg',
          width: 1200,
          height: 630,
          alt: `${category.category} от АБТ мебель`,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://kuhni-abt.ru/seo-image.jpg'],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Дополнительные мета-теги
    other: {
      'og:phone_number': '+7 (926) 723-28-80', // Добавьте реальный номер
      'og:email': 'info@kuhni-abt.ru', // Добавьте реальный email
      'og:locality': 'Москва',
      'og:region': 'Московская область',
      'og:country-name': 'Россия',
    },
  }
}

export default async function ProductCategoryPage({params}: Props) {
  const {categorySlug} = await params
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  const CustomCategoryPage = CATEGORY_PAGES[categorySlug]


  return (
    <>
      {CustomCategoryPage && <CustomCategoryPage/>}

      <CatalogComponent
        categoriesPromise={categoriesPromise}
        stylesPromise={stylesPromise}
        materialsPromise={materialsPromise}
        selectedCategory={categorySlug}
      />
      <ReviewsContainer/>
      <SiteContainer className="mt-4">
        <FeedbackForm/>
      </SiteContainer>
    </>
  )
}
