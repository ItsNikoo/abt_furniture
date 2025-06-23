import { fetchCategories } from '@/lib/api/categories'
import Catalog from '../../../../components/site/Catalog'
import ContentWrapper from '@/components/ContentWrapper'

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

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params
  const categoriesPromise = fetchCategories()

  return (
    <ContentWrapper>
      <Catalog categoriesPromise={categoriesPromise} selectedCategory={categorySlug}/>
    </ContentWrapper>
  )
}
