import AboutUs from '@/components/site/AboutUs'

export async function generateMetadata() {
  return {
    title: 'О компании | АБТ мебель',
    description: 'Узнайте больше о мебельной компании АБТ, нашей миссии, ценностях и команде.',
    openGraph: {
      title: 'О компании | АБТ мебель',
      description: 'АБТ мебель — мебельная компания, объединяющая качество, стиль и заботу о клиентах.',
      url: 'https://kuhni-abt.ru/about',
      siteName: 'АБТ мебель',
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export default function AboutPage() {
  return (
    <AboutUs/>
  )
}
