import Services from '@/components/site/Services'
import ContentWrapper from '@/components/ContentWrapper'

export async function generateMetadata() {
  return {
    title: 'Услуги | АБТ мебель',
    description: 'Ознакомьтесь с перечнем предоставляемых услуг по производству и установке мебели на заказ. АБТ мебель — ваш надежный партнер в создании идеального интерьера.',
    openGraph: {
      title: 'Услуги | АБТ мебель',
      description: 'Ознакомьтесь с перечнем предоставляемых услуг по производству и установке мебели на заказ. АБТ мебель — ваш надежный партнер в создании идеального интерьера.',
      url: 'https://kuhni-abt.ru/services',
      siteName: 'АБТ мебель',
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export default function ServicesPage() {
  return (
    <ContentWrapper>
      <Services/>
    </ContentWrapper>
  )
}
