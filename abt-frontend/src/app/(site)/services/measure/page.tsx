import MeasureServiceComponent from '@/components/site/Services/MeasureServiceComponent'
import SiteContainer from "@/components/SiteContainer";

export async function generateMetadata() {
  return {
    title: 'Замер | АБТ мебель',
    description: 'Профессиональная услуга замера от АБТ мебель. Точные измерения для идеальной подгонки мебели под ваш интерьер и пространство.',
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
