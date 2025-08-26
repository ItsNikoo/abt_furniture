import AboutUs from "@/components/site/AboutUs"

//
// export const metadata = {
//   title: "О компании | Абт кухни",
//   description: "Узнайте больше о мебельной компании АБТ, нашей миссии, ценностях и команде.",
//   openGraph: {
//     title: "О компании | АБТ мебель",
//     description: "АБТ мебель — мебельная компания, объединяющая качество, стиль и заботу о клиентах.",
//     url: "https://abt-furniture.ru/about",
//     siteName: "АБТ мебель",
//     images: [
//       {
//         url: "https://abt-furniture.ru/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Абт мебель — О компании",
//       },
//     ],
//     locale: "ru_RU",
//     type: "website",
//   },
// };

export async function generateMetadata() {
  return{
    title: "О компании | Абт кухни",
    description: "Узнайте больше о мебельной компании АБТ, нашей миссии, ценностях и команде.",
    openGraph: {
      title: "О компании | АБТ мебель",
      description: "АБТ мебель — мебельная компания, объединяющая качество, стиль и заботу о клиентах.",
      url: "https://abt-furniture.ru/about",
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default function AboutPage() {
  return (
    <AboutUs />
  )
}
