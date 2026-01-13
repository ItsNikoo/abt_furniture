import Contacts from '@/components/site/Contacts'
import SiteContainer from "@/components/SiteContainer";

export async function generateMetadata() {
  return {
    title: 'Контакты | АБТ мебель',
    description: 'Свяжитесь с нами для консультации, заказа или вопросов. Мы всегда рады помочь вам с выбором мебели от АБТ.',
    openGraph: {
      title: 'Контакты | АБТ мебель',
      description: 'Свяжитесь с нами для консультации, заказа или вопросов. Мы всегда рады помочь вам с выбором мебели от АБТ.',
      url: 'https://kuhni-abt.ru/contacts',
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

export default function ContactsPage() {
  return (
    <SiteContainer>
      <Contacts/>
    </SiteContainer>
  )
}
