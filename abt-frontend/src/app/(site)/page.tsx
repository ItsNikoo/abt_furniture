import FirstPage from '@/components/site/FirstPage'
import SalesContainer from '@/components/site/SalesContainer'
import ContentWrapper from '@/components/ContentWrapper'
import CategoriesGrid from '@/components/site/CategoriesGrid'

export const revalidate = 10 // ISR

export async function generateMetadata() {
  return{
    title: "Купить мебель от производителя | Абт мебель",
    description: "АБТ мебель: создаем стильную и функциональную мебель для вашего комфорта. Производство кухонь, шкафов и корпусной мебели на заказ.",
    keywords: ["мебель на заказ", "кухни на заказ от производителя", "корпусная мебель на заказ от производителя", "мебель от производителя", "АБТ мебель", "кухни на заказ Москва", "кухни на заказ Балашиха"],
    openGraph: {
      title: "Купить мебель от производителя | Абт мебель",
      description: "АБТ мебель: создаем стильную и функциональную мебель для вашего комфорта. Производство кухонь, шкафов и корпусной мебели на заказ.",
      url: "https://abt-furniture.ru",
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default async function Home() {

  return (
    <>
      <SalesContainer/>
      <FirstPage/>
      <ContentWrapper>
        <CategoriesGrid />
      </ContentWrapper>
    </>
  )
}
