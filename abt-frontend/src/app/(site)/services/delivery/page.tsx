import DeliveryPageComponent from '@/components/site/Services/DeliveryPageComponent'
import SiteContainer from "@/components/SiteContainer"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Доставка | АБТ мебель',
    description: 'Узнайте о наших условиях доставки и оплаты мебели на заказ. АБТ мебель предлагает удобные и надежные варианты для вашего комфорта.',
    keywords: [
      'магазин мебели с доставкой',
      "абт кухни доставка",
      'кухни на заказ Москва',
      'кухни на заказ Балашиха',
      "абт кухни",
      "кухни абт",
      "купить угловую кухню в москве"
    ],
    openGraph: {
      title: 'Доставка | АБТ мебель',
      description: 'Узнайте о наших условиях доставки и оплаты мебели на заказ. АБТ мебель предлагает удобные и надежные варианты для вашего комфорта.',
      url: 'https://kuhni-abt.ru/services/delivery',
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

export default function DeliveryPage() {
  return (
    <SiteContainer>
      <DeliveryPageComponent/>
    </SiteContainer>
  )
}