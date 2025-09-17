import Contacts from '@/components/site/Contacts'

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
  }
}

export default function ContactsPage() {
  return (
    <Contacts/>
  )
}
