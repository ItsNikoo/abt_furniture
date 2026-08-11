import AboutUs from '@/components/site/pages/AboutUs'
import SiteContainer from "@/components/SiteContainer"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'О компании | АБТ мебель',
    description: 'Узнайте больше о мебельной компании АБТ, нашей миссии, ценностях и команде.',
    keywords: [
      'о компании абт',
      'мебельная компания абт',
      'производитель мебели абт',
      'мебель на заказ от производителя',
      'кухни абт',
      'корпусная мебель абт',
      'абт мебель Москва',
      'абт мебель Балашиха'
    ],
    openGraph: {
      title: 'О компании | АБТ мебель',
      description: 'АБТ мебель — мебельная компания, объединяющая качество, стиль и заботу о клиентах.',
      url: 'https://kuhni-abt.ru/about',
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
  }
}

export default function AboutPage() {
  return (
    <SiteContainer>
      <AboutUs/>
    </SiteContainer>
  )
}