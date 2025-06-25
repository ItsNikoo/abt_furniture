'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import {Category, Material, Product, Style} from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {fetchProductById, fetchProducts } from '@/lib/api/products'
import { usePathname } from 'next/navigation'
import CatalogCard from '@/components/site/Catalog/CatalogCard'
import StyleSelector from "@/components/ui/CatalogSelectors/StyleSelector";
import MaterialSelector from "@/components/ui/CatalogSelectors/MaterialSelector";
import {Input} from "@/components/ui/input";

export default function Catalog({
  categoriesPromise,
  stylesPromise,
  materialsPromise,
  selectedCategory,
}: {
  categoriesPromise: Promise<Category[]>;
  stylesPromise: Promise<Style[]>;
  materialsPromise: Promise<Material[]>;
  selectedCategory?: string;
}) {
  const queryClient = useQueryClient()
  const categories = use(categoriesPromise)
  const styles = use(stylesPromise)
  const materials = use(materialsPromise)
  const pathname = usePathname() // получаем текущий путь

  const [currentCategory, setCurrentCategory] = useState<string>(
    selectedCategory ?? categories[0]?.categorySlug,
  )
  const [currentStyle, setCurrentStyle] = useState<string>('')
  const [currentMaterial, setCurrentMaterial] = useState<string>('')
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    // Извлекаем slug категории из URL
    const pathParts = pathname.split('/')
    const categorySlugFromUrl = pathParts[pathParts.length - 1]

    // Проверяем, что такая категория существует
    const categoryExists = categories.some(cat => cat.categorySlug === categorySlugFromUrl)

    if (categoryExists) {
      setCurrentCategory(categorySlugFromUrl)
    } else if (categories.length > 0) {
      setCurrentCategory(categories[0].categorySlug)
    }
  }, [pathname, categories]) // следим за изменениями pathname и categories

  const { data: products, isLoading, isError } = useQuery({
    queryKey: [`products`, currentCategory, currentStyle, currentMaterial],
    queryFn: async () => {
      const res = await fetchProducts({category: currentCategory, style: currentStyle, material: currentMaterial})
      return res
    },
    enabled: !!currentCategory,
  })

  const filteredProducts = products?.filter((product: Product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <div className='flex flex-row items-center gap-3'>
        <h1 className="text-7xl font-bold items-center">Каталог</h1>
        <Input
          type="search"
          placeholder="Поиск..."
          className="mt-5 h-16 w-full bg-transparent border-none focus:ring-0 placeholder:text-gray-300 shadow-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul className="flex flex-row gap-8 font-medium text-base mt-6">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/catalog/${category.categorySlug}`}
              className={`rounded-md transition cursor-pointer ${
                currentCategory === category.categorySlug
                ? 'text-mainPurple'
                : 'text-black'
              }`}
            >
              {category.category}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-3 mt-2">
        <StyleSelector
          styles={styles}
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
        />
        <MaterialSelector
          materials={materials}
          currentMaterial={currentMaterial}
          setCurrentMaterial={setCurrentMaterial}
        />
      </div>

      <div className="mt-5">
        {isLoading && <p>Загрузка продуктов...</p>}
        {isError && <p>Ошибка при загрузке продуктов</p>}
        {filteredProducts && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-6 mt-6">
            {filteredProducts.map((product: Product) => (
              <Link key={product.id}
                    href={`/catalog/${currentCategory}/${product.id}-${product.productSlug}`}
                    onMouseEnter={() => {
                      queryClient.prefetchQuery({
                        queryKey: ['product', product.id],
                        queryFn: () => fetchProductById(product.id),
                      })
                    }}
              >
                <CatalogCard product={product}/>
              </Link>
            ))}
          </div>
        )}
        {filteredProducts && filteredProducts.length === 0 && !isLoading && <p>Нет продуктов в этой категории.</p>}
      </div>
    </>
  )
}
