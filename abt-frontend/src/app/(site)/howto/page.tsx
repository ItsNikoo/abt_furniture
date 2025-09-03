import Howto from "@/components/site/Howto"

export async function generateMetadata(){
  return{
    title: "Как совершить заказ | Абт мебель",
    description: "Узнайте, как мы создаем мебель вашей мечты. От консультации до установки — процесс работы с АБТ мебель прост и прозрачен.",
    openGraph: {
      title: "Как совершить заказ | АБТ мебель",
      description: "Узнайте, как мы создаем мебель вашей мечты. От консультации до установки — процесс работы с АБТ мебель прост и прозрачен.",
      url: "https://abt-furniture.ru/howto",
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default function HowToPage(){
  return(
    <Howto />
  )
}