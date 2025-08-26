import ContentWrapper from "@/components/ContentWrapper"
import DesignPageComponent from "@/components/site/Services/DesignPageComponent"

export async function generateMetadata(){
  return{
    title: "Дизайн интерьера | Абт кухни",
    description: "Профессиональные услуги по дизайну интерьера от АБТ мебель. Создаем уникальные и функциональные пространства, отражающие ваш стиль и предпочтения.",
    openGraph: {
      title: "Дизайн интерьера | АБТ мебель",
      description: "Профессиональные услуги по дизайну интерьера от АБТ мебель. Создаем уникальные и функциональные пространства, отражающие ваш стиль и предпочтения.",
      url: "https://abt-furniture.ru/services/design",
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default function DesignPage() {
  return (
    <ContentWrapper>
      <DesignPageComponent />
    </ContentWrapper>
  );
}