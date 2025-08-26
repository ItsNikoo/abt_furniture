import FirstPage from '@/components/site/FirstPage'
import { fetchSales } from '@/lib/api/sales'
import SalesContainer from '@/components/site/SalesContainer'
import { fetchCategories } from '@/lib/api/categories'
import ContentWrapper from '@/components/ContentWrapper'
import CategoriesGrid from '@/components/site/CategoriesGrid'

export const revalidate = 10 // ISR

export async function generateMetadata() {
  return{
    title: "Купить мебель от производителя | Абт кухни",
    description: "АБТ мебель: создаем стильную и функциональную мебель для вашего комфорта. Производство кухонь, шкафов и корпусной мебели на заказ.",
    openGraph: {
      title: "Купить мебель от производителя | Абт кухни",
      description: "АБТ мебель: создаем стильную и функциональную мебель для вашего комфорта. Производство кухонь, шкафов и корпусной мебели на заказ.",
      url: "https://abt-furniture.ru",
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default async function Home() {
  const salesPromise = fetchSales()
  const categoriesPromise = fetchCategories()

  return (
    <>
      <SalesContainer promise={salesPromise}/>
      <FirstPage/>
      <ContentWrapper>
        <CategoriesGrid promise={categoriesPromise}/>
      </ContentWrapper>
    </>
  )
}
