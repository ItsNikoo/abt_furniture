import ContentWrapper from '@/components/ContentWrapper'
import DeliveryPageComponent from '@/components/site/Services/DeliveryPageComponent'

export async function generateMetadata() {
  return {
    title: 'Доставка | АБТ мебель',
    description: 'Узнайте о наших условиях доставки и оплаты мебели на заказ. АБТ мебель предлагает удобные и надежные варианты для вашего комфорта.',
    openGraph: {
      title: 'Доставка | АБТ мебель',
      description: 'Узнайте о наших условиях доставки и оплаты мебели на заказ. АБТ мебель предлагает удобные и надежные варианты для вашего комфорта.',
      url: 'https://kuhni-abt.ru/services/delivery',
      siteName: 'АБТ мебель',
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export default function DeliveryPage() {
  return (
    <ContentWrapper>
      <DeliveryPageComponent/>
    </ContentWrapper>
  )
}
