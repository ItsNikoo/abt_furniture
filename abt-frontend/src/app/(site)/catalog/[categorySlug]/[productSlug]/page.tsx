import ContentWrapper from '@/components/ContentWrapper'
import { fetchProductById } from '@/lib/api/products'
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
  const { productSlug } = await params
  const id = productSlug.split('-')[0]
  const product: Product = await fetchProductById(Number(id))

  return {
    title: `Купить ${product.title} в АБТ`,
    description: product.description || 'Описание отсутствует',
    openGraph: {
      title: `Купить ${product.title} в АБТ`,
      images: product.photos?.[0]?.photoUrl ? [product.photos[0].photoUrl] : [],
    },
  }
}

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
