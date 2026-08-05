import Contacts from '@/components/site/Contacts'
import SiteContainer from "@/components/SiteContainer"
import {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Контакты | АБТ мебель',
    description: 'Свяжитесь с нами для консультации, заказа или вопросов. Мы всегда рады помочь вам с выбором мебели от АБТ.',
    keywords: [
      "абт кухни",
      "кухни абт",
      "купить угловую кухню в москве",
      "кухни в балашихе",
      "кухни железнодорожный",
      "кухни недорого в москве",
      "кухни купить в москве недорого"
    ],
    openGraph: {
      title: 'Контакты | АБТ мебель',
      description: 'Свяжитесь с нами для консультации, заказа или вопросов. Мы всегда рады помочь вам с выбором мебели от АБТ.',
      url: 'https://kuhni-abt.ru/contacts',
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

export default function ContactsPage() {
  return (
    <SiteContainer>
      <Contacts/>
    </SiteContainer>
  )
}
