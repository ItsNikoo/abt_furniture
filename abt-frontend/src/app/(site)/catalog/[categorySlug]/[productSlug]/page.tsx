import ContentWrapper from '@/components/ContentWrapper'
import {fetchProductById, fetchProducts} from '@/lib/api/products'
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
    title: `${product.title} от производителя | АБТ`,
    description: product.description || 'Купить продукт от производителя АБТ. Высокое качество, стильный дизайн и доступные цены прямиком от производителя.',
    openGraph: {
      title: `Купить ${product.title} в АБТ`,
      description: product.description || 'Купить продукт от производителя || АБТ кухни',
      images: product.photos?.[0]?.photoUrl ? [product.photos[0].photoUrl] : [],
      url: `https://abt-furniture.ru/catalog/${product.category}/${product.productSlug}`,
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const products = await fetchProducts(); // Предполагается, что есть такая функция
  return products.map((product: Product) => ({
    categorySlug: product.category, // Если продукт привязан к категории
    productSlug: product.productSlug,
  }));
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
