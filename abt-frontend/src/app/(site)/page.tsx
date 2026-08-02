import FirstPage from '@/components/site/FirstPage'
import CategoriesGrid from '@/components/site/CategoriesGrid'
import SiteContainer from "@/components/SiteContainer"
import AdvantagesContainer from "@/components/site/AdvantagesContainer"
import FeedbackForm from "@/components/shared/FeedbackForm"
import ReviewsContainer from "@/components/site/Reviews/ReviewsContainer"
import {Metadata} from "next"
import Portfolio from "@/components/site/Portfolio";
import MapSection from "@/components/site/MapSection";

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Купить мебель от производителя | АБТ мебель',
    description: 'АБТ мебель: создаем стильную и функциональную мебель для вашего комфорта. Производство кухонь, шкафов и корпусной мебели на заказ.',
    keywords: [
      'мебель на заказ',
      'кухни на заказ от производителя',
      'мебель на заказ по размерам',
      'мебель на заказ недорого',
      'мебель индивидуальная на заказ недорого',
      'мебель от производителя',
      'АБТ мебель',
      'кухни на заказ Москва',
      'кухни на заказ Балашиха',
      "абт кухни",
      "кухни абт",
      "купить угловую кухню в москве"
    ],
    openGraph: {
      title: 'Купить мебель от производителя | Абт мебель',
      description: 'АБТ мебель: создаем стильную и функциональную мебель для вашего комфорта. Производство кухонь, шкафов и корпусной мебели на заказ.',
      url: 'https://kuhni-abt.ru',
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

export default async function Home() {

  return (
    <>
      <FirstPage/>
      <SiteContainer>
        <AdvantagesContainer/>
        <CategoriesGrid/>
        <FeedbackForm/>
      </SiteContainer>
      <Portfolio />
      <ReviewsContainer/>
      <MapSection/>
    </>
  )
}
