import Services from '@/components/site/Services'
import SiteContainer from "@/components/SiteContainer"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Услуги | АБТ мебель',
    description: 'Ознакомьтесь с перечнем предоставляемых услуг по производству и установке мебели на заказ. АБТ мебель — ваш надежный партнер в создании идеального интерьера.',
    keywords: [
      'услуги мебель на заказ',
      'установка кухонной мебели',
      'сборка и установка мебели',
      'создание уникального проекта',
      'замеры мебели',
      'дизайн интерьера кухни',
      'дизайн проект кухни',
      'магазин мебели с доставкой',
      'кухни на заказ Москва',
      'кухни на заказ Балашиха',
      "абт кухни",
      "кухни абт",
      "купить угловую кухню в москве",
      "абт кухни услуги",
    ],
    openGraph: {
      title: 'Услуги | АБТ мебель',
      description: 'Ознакомьтесь с перечнем предоставляемых услуг по производству и установке мебели на заказ. АБТ мебель — ваш надежный партнер в создании идеального интерьера.',
      url: 'https://kuhni-abt.ru/services',
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

export default function ServicesPage() {
  return (
    <SiteContainer>
      <Services/>
    </SiteContainer>
  )
}