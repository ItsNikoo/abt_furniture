import SiteContainer from "@/components/SiteContainer";
import ProductContainer from "@/components/site/ProductContainer";
import {Promotion} from "@/types";
import {fetchPromotionById} from "@/lib/api/promotions";
import {Metadata} from 'next'

type Props = {
  params: Promise<{
    categorySlug: string;
    saleSlug: string;
  }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  // Get the promotion data for
  const {categorySlug} = await params
  const {saleSlug} = await params
  const id = saleSlug.split('-')[0]

  try {
    const promotion: Promotion = await fetchPromotionById(Number(id))

    return {
      title: `${promotion.title} | АБТ мебель`,
      description: `Готовое решение: ${promotion.title} от производителя АБТ. Скидки, высокое качество и стильный дизайн. ${promotion.description}`,
      openGraph: {
        title: `${promotion.title} | АБТ мебель`,
        description: `Готовое решение: ${promotion.title} от производителя АБТ. Скидки, высокое качество и стильный дизайн.`,
        images: promotion.photos?.map(img => ({
          url: img.photoUrl,
          alt: promotion.title
        })) || [],
        siteName: 'АБТ мебель',
        locale: 'ru_RU',
        type: 'website',
        url: `https://kuhni-abt.ru/sales/${categorySlug}/${saleSlug}`
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      other: {
        'product:price:amount': promotion.price?.toString(),
        'product:price:currency': 'RUB',
      }
    }
  } catch {
    // Fallback metadata if promotion fetch fails
    return {
      title: `Спецпредложение от производителя | АБТ мебель`,
      description: 'Актуальные акции и специальные предложения на кухни и мебель от производителя АБТ. Скидки, бесплатный замер и дизайн-проект.',
      openGraph: {
        title: `Спецпредложение от производителя`,
        description: 'Актуальные акции и специальные предложения на кухни и мебель от производителя АБТ. Скидки, бесплатный замер и дизайн-проект.',
        images: [],
        siteName: 'АБТ мебель',
        locale: 'ru_RU',
        type: 'website',
      },
    }
  }
}

export const revalidate = 60

export default async function SalePage({params}: Props) {
  const {saleSlug} = await params
  const id = saleSlug.split('-')[0]
  const promotion: Promotion = await fetchPromotionById(Number(id))

  return(
    <SiteContainer>
      <ProductContainer entity={promotion} isPromotion={true}/>
    </SiteContainer>
  )
}