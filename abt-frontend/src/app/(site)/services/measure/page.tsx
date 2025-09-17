import ContentWrapper from '@/components/ContentWrapper'
import MeasureServiceComponent from '@/components/site/Services/MeasureServiceComponent'

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
  }
}

export default function MeasurePage() {
  return (
    <ContentWrapper>
      <MeasureServiceComponent/>
    </ContentWrapper>
  )
}
