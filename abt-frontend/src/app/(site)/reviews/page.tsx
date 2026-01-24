import SiteContainer from "@/components/SiteContainer"
import ReviewsClientPage from "@/components/site/Reviews/ReviewsClientPage"
import {fetchReviews} from "@/lib/api/reviews"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  const reviews = await fetchReviews()
  const reviewsCount = reviews.length

  const title = `Отзывы клиентов о мебели АБТ (${reviewsCount}) | Реальные отзывы`
  const description = `Читайте реальные отзывы наших клиентов о мебели на заказ от фабрики АБТ. Фото готовых работ, оценки качества и сервиса. Честные мнения покупателей`

  const keywords = [
    'отзывы о мебели АБТ',
    'мебель на заказ отзывы',
    'мебель с хорошими отзывами',
    'кухни с отзывами',
    'отзывы о качестве мебели',
    'абт кухни отзывы',
    'мебель на заказ москва отзывы',
  ]

  const url = 'https://kuhni-abt.ru/reviews'

  return {
    title,
    description,
    keywords: keywords.join(', '),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ru_RU',
      url,
      siteName: 'АБТ мебель - Фабрика мебели на заказ',
      images: [
        {
          url: '/og-reviews.jpg',
          width: 1200,
          height: 630,
          alt: 'Отзывы клиентов АБТ мебель',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-reviews.jpg'],
    },

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

    other: {
      'og:type': 'website',
      'og:locality': 'Москва',
      'og:region': 'Московская область',
      'og:country-name': 'Россия',
    },
  }
}

export default async function ReviewsPage(){
  const reviews = await fetchReviews()

  return(
    <SiteContainer>
      <ReviewsClientPage reviews={reviews} />
    </SiteContainer>
  )
}