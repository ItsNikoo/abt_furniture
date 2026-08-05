import {fetchProductById} from '@/lib/api/products'
import {Product} from '@/types/types'
import ProductContainer from '@/components/site/ProductContainer'
import {Metadata} from 'next'
import SiteContainer from "@/components/SiteContainer"

type Props = {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  // Get the product data for metadata
  const {productSlug} = await params
  const {categorySlug} = await params
  const id = productSlug.split('-')[0]

  try {
    const product: Product = await fetchProductById(Number(id))

    return {
      title: `${product.title} | АБТ мебель`,
      description: product.description || `Купить ${product.title} от производителя АБТ. Высокое качество, стильный дизайн и доступные цены.`,
      keywords: [
        product.title,
        `${product.title} купить`,
        `${product.title} от производителя`,
        'мебель на заказ',
        'кухни на заказ',
        'кухни абт',
        'абт кухни',
        'купить мебель недорого в москве',
        'мебель Балашиха'
      ],
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
        url: `https://kuhni-abt.ru/catalog/${categorySlug}/${productSlug}`
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
        'product:price:amount': product.price?.toString(),
        'product:price:currency': 'RUB',
      }
    }
  } catch {
    // Fallback metadata if product fetch fails
    return {
      title: `Товар от производителя | АБТ мебель`,
      description: 'Купить продукт от производителя АБТ. Высокое качество, стильный дизайн и доступные цены прямиком от производителя.',
      keywords: [
        'мебель на заказ',
        'кухни на заказ',
        'корпусная мебель',
        'мебель от производителя',
        'АБТ мебель',
        'мебель Москва',
        'мебель Балашиха'
      ],
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

export default async function ProductPage({params}: Props) {
  const {productSlug} = await params
  const id = productSlug.split('-')[0]
  const product: Product = await fetchProductById(Number(id))

  return (
    <SiteContainer>
      <ProductContainer entity={product}/>
    </SiteContainer>
  )
}