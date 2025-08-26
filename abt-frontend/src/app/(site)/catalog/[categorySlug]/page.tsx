import { fetchCategories } from '@/lib/api/categories'
import Catalog from '../../../../components/site/Catalog'
import ContentWrapper from '@/components/ContentWrapper'
import { fetchStyles } from "@/lib/api/styles"
import { fetchMaterials } from "@/lib/api/materials"
import { Category } from "@/types"
import { Metadata } from "next"

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((category: { slug: string }) => ({
    categorySlug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Правильное получение параметров через await
  const { categorySlug } = await params;
  const categories = await fetchCategories()
  const category: Category | undefined = categories.find((cat: Category) => cat.categorySlug === categorySlug) // Исправлено: cat.slug вместо cat.categorySlug

  return {
    title: `${category?.category} от производителя | АБТ`,
    description: `Купить ${category?.category} от производителя АБТ. Высокое качество, стильный дизайн и доступные цены.`,
    openGraph: {
      title: `Купить ${category?.category} в АБТ`,
      images: category?.photo ? [category.photo] : [],
      url: `https://abt-furniture.ru/catalog/${categorySlug}`,
      siteName: "АБТ мебель",
      locale: "ru_RU",
      type: "website",
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  // Правильное получение параметров через await
  const { categorySlug } = await params;
  const categoriesPromise = fetchCategories()
  const stylesPromise = fetchStyles()
  const materialsPromise = fetchMaterials()

  return (
    <ContentWrapper>
      <Catalog
        categoriesPromise={categoriesPromise}
        selectedCategory={categorySlug}
        stylesPromise={stylesPromise}
        materialsPromise={materialsPromise}
      />
    </ContentWrapper>
  )
}