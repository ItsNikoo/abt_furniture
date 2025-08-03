'use client'

import {use, useEffect, useState, Suspense} from 'react'
import Link from 'next/link'
import {Category, Material, Product, Style} from '@/types'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {fetchProductById, fetchProducts} from '@/lib/api/products'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import CatalogCard from '@/components/site/Catalog/CatalogCard'
import StyleSelector from "@/components/ui/CatalogSelectors/StyleSelector";
import MaterialSelector from "@/components/ui/CatalogSelectors/MaterialSelector";
import {Input} from "@/components/ui/input";

interface CatalogProps {
    categoriesPromise: Promise<Category[]>;
    stylesPromise: Promise<Style[]>;
    materialsPromise: Promise<Material[]>;
    selectedCategory?: string;
}

function CatalogContent({categoriesPromise, stylesPromise, materialsPromise, selectedCategory,}: CatalogProps) {
    const queryClient = useQueryClient()
    const categories = use(categoriesPromise)
    const styles = use(stylesPromise)
    const materials = use(materialsPromise)
    const pathname = usePathname() // получаем текущий путь
    const searchParams = useSearchParams()
    const router = useRouter()

    const [currentCategory, setCurrentCategory] = useState<string>(
        selectedCategory ?? categories[0]?.categorySlug,
    )
    const [currentStyle, setCurrentStyle] = useState<string>('')
    const [currentMaterial, setCurrentMaterial] = useState<string>('')
    const [query, setQuery] = useState<string>('')

    // Инициализация состояния из URL параметров при загрузке
    useEffect(() => {
        const styleFromUrl = searchParams.get('style') || ''
        const materialFromUrl = searchParams.get('material') || ''
        const queryFromUrl = searchParams.get('query') || ''

        setCurrentStyle(styleFromUrl)
        setCurrentMaterial(materialFromUrl)
        setQuery(queryFromUrl)
    }, [searchParams])

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

    // Обновление URL при изменении фильтров
    const updateURL = (newFilters: {
        category?: string;
        style?: string;
        material?: string;
        query?: string;
    }) => {
        const params = new URLSearchParams(searchParams)
        if (newFilters.category) {
            params.set('category', newFilters.category)
        }
        if (newFilters.style) {
            params.set('style', newFilters.style)
        } else {
            params.delete('style')
        }
        if (newFilters.material) {
            params.set('material', newFilters.material)
        } else {
            params.delete('material')
        }
        if (newFilters.query) {
            params.set('query', newFilters.query)
        } else {
            params.delete('query')
        }
        // Обновляем URL, сохраняя категорию в пути
        const newUrl = `/catalog/${newFilters.category || currentCategory}?${params.toString()}`
        router.push(newUrl)
    }

    const handleStyleChange = (style: string) => {
        setCurrentStyle(style)
        updateURL({style, material: currentMaterial, query})
    }

    const handleMaterialChange = (material: string) => {
        setCurrentMaterial(material)
        updateURL({style: currentStyle, material, query})
    }

    const {data: products, isLoading, isError} = useQuery({
        queryKey: [`products`, currentCategory, currentStyle, currentMaterial],
        queryFn: async () => {
            return await fetchProducts({category: currentCategory, style: currentStyle, material: currentMaterial})
        },
        enabled: !!currentCategory,
    })

    const filteredProducts = products?.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 '>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold font-montserrat">Каталог</h1>
                <Input
                    type="search"
                    placeholder="Поиск..."
                    className="mt-2 sm:mt-5 h-12 sm:h-16 w-full bg-transparent border-none focus:ring-0 placeholder:text-gray-300 shadow-none text-sm sm:text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <ul className="flex flex-wrap sm:flex-row gap-4 sm:gap-8 font-medium text-sm sm:text-base mt-2 sm:mt-4">
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link
                            href={`/catalog/${category.categorySlug}`}
                            className={`rounded-md transition cursor-pointer px-2 py-1 sm:px-0 sm:py-0 ${
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
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                <StyleSelector
                    styles={styles}
                    currentStyle={currentStyle}
                    setCurrentStyle={handleStyleChange}
                />
                <MaterialSelector
                    materials={materials}
                    currentMaterial={currentMaterial}
                    setCurrentMaterial={handleMaterialChange}
                />
            </div>

            <div className="mt-3 sm:mt-5">
                {isLoading && <p className="text-sm sm:text-base">Загрузка продуктов...</p>}
                {isError && <p className="text-sm sm:text-base">Ошибка при загрузке продуктов</p>}
                {filteredProducts && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
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
                {filteredProducts && filteredProducts.length === 0 && !isLoading &&
                    <p className="text-sm sm:text-base">Нет продуктов в этой категории.</p>}
            </div>
        </>
    )
}

export default function CatalogWrapper({categoriesPromise, stylesPromise, materialsPromise, selectedCategory,}: CatalogProps) {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <CatalogContent categoriesPromise={categoriesPromise} stylesPromise={stylesPromise} materialsPromise={materialsPromise} selectedCategory={selectedCategory} />
        </Suspense>
    )
}
