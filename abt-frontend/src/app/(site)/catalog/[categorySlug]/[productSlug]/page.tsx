// import ContentWrapper from '@/components/ContentWrapper'
// import { fetchProductById } from '@/lib/api/products'
// import { Product } from '@/types'
// import ProductContainer from '@/components/site/ProductContainer'
// import { Metadata } from 'next'
//
// type Props = {
//   params: Promise<{
//     categorySlug: string;
//     productSlug: string;
//   }>;
// };
//
// export async function generateMetadata(): Promise<Metadata> {
//
//   return {
//     title: `Товар от производителя | АБТ мебель`,
//     description: 'Купить продукт от производителя АБТ. Высокое качество, стильный дизайн и доступные цены прямиком от производителя.',
//     openGraph: {
//       title: `Купить товар от производителя`,
//       description: 'Купить продукт от производителя || АБТ мебель',
//       images: [],
//       siteName: 'АБТ мебель',
//       locale: 'ru_RU',
//       type: 'website',
//     },
//   }
// }
//
// export const revalidate = 60
//
// export default async function ProductPage({ params }: Props) {
//   const { productSlug } = await params
//   const id = productSlug.split('-')[0]
//   const product: Product = await fetchProductById(Number(id))
//   return (
//     <ContentWrapper>
//       <ProductContainer product={product}/>
//     </ContentWrapper>
//   )
// }

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
  // Get the product data for metadata
  const { productSlug } = await params
  const id = productSlug.split('-')[0]

  try {
    const product: Product = await fetchProductById(Number(id))

    return {
      title: `${product.title} | АБТ мебель`,
      description: product.description || `Купить ${product.title} от производителя АБТ. Высокое качество, стильный дизайн и доступные цены.`,
      openGraph: {
        title: `${product.title} - купить от производителя`,
        description: product.description || `Купить ${product.title} от производителя АБТ мебель`,
        images: product.photos?.map(img => ({
          url: img.photoUrl,
          alt: product.title
        })) || [],
        siteName: 'АБТ мебель',
        locale: 'ru_RU',
        type: 'website',
      },
      other: {
        'product:price:amount': product.price?.toString(),
        'product:price:currency': 'RUB',
      }
    }
  } catch {
    // Fallback metadata if product fetch fails
    return {
      title: `Товар от производителя | АБТ мебель`,
      description: 'Купить продукт от производителя АБТ. Высокое качество, стильный дизайн и доступные цены прямиком от производителя.',
      openGraph: {
        title: `Купить товар от производителя`,
        description: 'Купить продукт от производителя АБТ. Высокое качество, стильный дизайн и доступные цены прямиком от производителя.',
        images: [],
        siteName: 'АБТ мебель',
        locale: 'ru_RU',
        type: 'website',
      },
    }
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