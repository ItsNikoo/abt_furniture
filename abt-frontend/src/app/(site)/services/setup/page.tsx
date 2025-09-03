import ContentWrapper from "@/components/ContentWrapper"
import SetupPageComponent from "@/components/site/Services/SetupPageComponent"

export async function generateMetadata(){
  return{
    title: "Настройка и установка | Абт мебель",
    description: "Услуги по настройке и установке мебели от АБТ мебель. Профессиональная установка для идеального результата.",
    openGraph: {
      title: "Настройка и установка | АБТ мебель",
      description: "Услуги по настройке и установке мебели от АБТ мебель. Профессиональная установка для идеального результата.",
      url: "https://abt-furniture.ru/services/setup",
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default function SetupPage() {
  return (
    <ContentWrapper>
      <SetupPageComponent />
    </ContentWrapper>
  );
}
