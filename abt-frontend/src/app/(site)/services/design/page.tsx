import DesignPageComponent from '@/components/site/pages/Services/DesignPageComponent'
import SiteContainer from "@/components/SiteContainer"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Дизайн интерьера | АБТ мебель',
    description: 'Профессиональные услуги по дизайну интерьера от АБТ мебель. Создаем уникальные и функциональные пространства, отражающие ваш стиль и предпочтения.',
    keywords: [
      'дизайн кухонного гарнитура',
      'дизайн интерьера кухни',
      'дизайн мебели на заказ',
      'дизайн кухни АБТ',
      'дизайн интерьера Москва',
      'дизайнер мебели Балашиха',
      'кухни на заказ Москва',
      'кухни на заказ Балашиха',
      "абт кухни",
      "кухни абт",
      "купить угловую кухню в москве",
      "абт кухни дизайн"
    ],
    openGraph: {
      title: 'Дизайн интерьера | АБТ мебель',
      description: 'Профессиональные услуги по дизайну интерьера от АБТ мебель. Создаем уникальные и функциональные пространства, отражающие ваш стиль и предпочтения.',
      url: 'https://kuhni-abt.ru/services/design',
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

export default function DesignPage() {
  return (
    <SiteContainer>
      <DesignPageComponent/>
    </SiteContainer>
  )
}