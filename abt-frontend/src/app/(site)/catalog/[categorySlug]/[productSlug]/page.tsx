import ContentWrapper from '@/components/ContentWrapper'
import {fetchProductById} from '@/lib/api/products'
import { Product } from '@/types'
import ProductContainer from '@/components/site/ProductContainer'
import { Metadata } from 'next'

type Props = {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params
  const domain = process.env.DOMAIN || "kuhni-abt.ru"

  return {
    title: `Товар от производителя | АБТ мебель`,
    description: 'Купить продукт от производителя АБТ. Высокое качество, стильный дизайн и доступные цены прямиком от производителя.',
    openGraph: {
      title: `Купить товар от производителя`,
      description: 'Купить продукт от производителя || АБТ мебель',
      images: [],
      url: `https://${domain}/catalog/${categorySlug}/${productSlug}`,
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export const revalidate = 60


export default async function ProductPage({ params }: Props) {
  const { productSlug } = await params
  const id = productSlug.split('-')[0]
  const product: Product = await fetchProductById(Number(id))
  return (
      <ContentWrapper>
        <ProductContainer product={product}/>
      </ContentWrapper>
  )
}