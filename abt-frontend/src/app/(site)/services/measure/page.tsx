import MeasureServiceComponent from '@/components/site/Services/MeasureServiceComponent'
import SiteContainer from "@/components/SiteContainer"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Замер | АБТ мебель',
    description: 'Профессиональная услуга замера от АБТ мебель. Точные измерения для идеальной подгонки мебели под ваш интерьер и пространство.',
    keywords: [
      'замер мебели на заказ',
      'бесплатный замер кухни',
      'услуга замера абт',
      'замер интерьера для мебели',
      'точный замер кухни',
      'замер мебели Москва',
      'замер кухни Балашиха',
      'кухни на заказ Москва',
      'кухни на заказ Балашиха',
      "абт кухни",
      "кухни абт",
      "купить угловую кухню в москве",
      'абт кухни замер'
    ],
    openGraph: {
      title: 'Замер | АБТ мебель',
      description: 'Профессиональная услуга замера от АБТ мебель. Точные измерения для идеальной подгонки мебели под ваш интерьер и пространство.',
      url: 'https://kuhni-abt.ru/services/measure',
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

export default function MeasurePage() {
  return (
    <SiteContainer>
      <MeasureServiceComponent/>
    </SiteContainer>
  )
}