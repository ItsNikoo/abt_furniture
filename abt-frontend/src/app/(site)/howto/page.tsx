import Howto from '@/components/site/Howto'
import SiteContainer from "@/components/SiteContainer";

export async function generateMetadata() {
  return {
    title: 'Как совершить заказ | АБТ мебель',
    description: 'Узнайте, как мы создаем мебель вашей мечты. От консультации до установки — процесс работы с АБТ мебель прост и прозрачен.',
    openGraph: {
      title: 'Как совершить заказ | АБТ мебель',
      description: 'Узнайте, как мы создаем мебель вашей мечты. От консультации до установки — процесс работы с АБТ мебель прост и прозрачен.',
      url: 'https://kuhni-abt.ru/howto',
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

export default function HowToPage() {
  return (
    <SiteContainer>
      <Howto/>
    </SiteContainer>
  )
}
