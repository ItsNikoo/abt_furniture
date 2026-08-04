'use client'

import {useQuery, useQueryClient} from "@tanstack/react-query"
import {use, useEffect, useState} from "react"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {motion} from "framer-motion"
import {Input} from "@/components/ui/input"
import Link from "next/link"
import LoadingPlaceholder from "@/components/placeholders/LoadingPlaceholder"
import SortSelector from "@/components/ui/CatalogSelectors/SortSelector"
import {GenericSelector} from "@/components/shared/GenericSelector"
import {Category, Material, Style, Product, Promotion} from "@/types"
import {Filters} from "@/lib/api/filters"

type CatalogItem = Product | Promotion

interface BaseCatalogContentProps {
  categoriesPromise: Promise<Category[]>;
  stylesPromise: Promise<Style[]>;
  materialsPromise: Promise<Material[]>;
  selectedCategory?: string;
  title: string;
  basePath: string;
  fetchFn: (filters: Filters) => Promise<CatalogItem[]>;
  queryKeyPrefix: string;
  renderCard: (item: CatalogItem) => React.ReactNode;
  getItemLink: (item: CatalogItem, categorySlug: string) => string;
  prefetchItem?: (id: number) => Promise<CatalogItem>;
}

export default function BaseCatalogContent({
                                             categoriesPromise,
                                             stylesPromise,
                                             materialsPromise,
                                             selectedCategory,
                                             title,
                                             basePath,
                                             fetchFn,
                                             queryKeyPrefix,
                                             renderCard,
                                             getItemLink,
                                             prefetchItem,
                                           }: BaseCatalogContentProps) {
  const queryClient = useQueryClient()
  const categories = use(categoriesPromise)

  const styles = use(stylesPromise)
  const transformedStyles = styles.map((style) => ({
    id: style.id,
    value: style.style,
  }))

  const materials = use(materialsPromise)
  const transformedMaterials = materials.map((material) => ({
    id: material.id,
    value: material.material,
  }))

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentCategory, setCurrentCategory] = useState<string>(
    selectedCategory ?? categories[0]?.categorySlug ?? ""
  )
  const [currentStyle, setCurrentStyle] = useState<string>("")
  const [currentMaterial, setCurrentMaterial] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [currentSort, setCurrentSort] = useState<"asc" | "desc" | "default">("default")

  // Флаг первой загрузки для предотвращения мерцания
  const [isInitialized, setIsInitialized] = useState(false)

  // Синхронизация с URL (query params) - только при первой загрузке
  useEffect(() => {
    const styleFromUrl = searchParams.get("style") || ""
    const materialFromUrl = searchParams.get("material") || ""
    const queryFromUrl = searchParams.get("query") || ""
    const sortFromUrl = searchParams.get("sort")

    setCurrentStyle(styleFromUrl)
    setCurrentMaterial(materialFromUrl)
    setQuery(queryFromUrl)

    const normalizedSort: "default" | "asc" | "desc" =
      sortFromUrl === "cheap" ? "asc" :
        sortFromUrl === "expensive" ? "desc" :
          "default"

    setCurrentSort(normalizedSort)
    setIsInitialized(true)
  }, [searchParams])

  // Синхронизация категории из pathname
  useEffect(() => {
    const pathParts = pathname.split("/")
    const categorySlugFromUrl = pathParts[pathParts.length - 1]

    const categoryExists = categories.some((cat) => cat.categorySlug === categorySlugFromUrl)

    if (categoryExists) {
      setCurrentCategory(categorySlugFromUrl)
    } else if (categories.length > 0) {
      setCurrentCategory(categories[0].categorySlug)
    }
  }, [pathname, categories])

  // Обновление URL - ИСПРАВЛЕНО: теперь передаём все текущие фильтры
  const updateURL = (newFilters: Partial<{
    category: string;
    style: string;
    material: string;
    query: string;
    sort: "asc" | "desc" | "default";
  }>) => {
    const params = new URLSearchParams()

    // Используем новые значения или текущие
    const style = newFilters.style !== undefined ? newFilters.style : currentStyle
    const material = newFilters.material !== undefined ? newFilters.material : currentMaterial
    const searchQuery = newFilters.query !== undefined ? newFilters.query : query
    const sort = newFilters.sort !== undefined ? newFilters.sort : currentSort
    const category = newFilters.category || currentCategory

    // Добавляем в URL только непустые параметры
    if (style) params.set('style', style)
    if (material) params.set('material', material)
    if (searchQuery) params.set('query', searchQuery)

    if (sort !== "default") {
      params.set("sort", sort === "asc" ? "cheap" : "expensive")
    }

    const queryString = params.toString()
    const newUrl = `${basePath}/${category}${queryString ? `?${queryString}` : ''}`
    router.push(newUrl)
  }

  const handleStyleChange = (style: string) => {
    setCurrentStyle(style)
    updateURL({style})
  }

  const handleMaterialChange = (material: string) => {
    setCurrentMaterial(material)
    updateURL({material})
  }

  const handleSortChange = (sort: "default" | "asc" | "desc") => {
    setCurrentSort(sort)
    updateURL({sort})
  }

  const {data: items, isError} = useQuery({
    queryKey: [queryKeyPrefix, currentCategory, currentStyle, currentMaterial, currentSort],
    queryFn: async () => {
      return await fetchFn({
        category: currentCategory,
        style: currentStyle || undefined,
        material: currentMaterial || undefined,
        ordering:
          currentSort === "asc" ? "price" :
            currentSort === "desc" ? "-price" :
              undefined,
      })
    },
    enabled: !!currentCategory && isInitialized, // Добавлен флаг инициализации
  })

  const filteredItems = items?.filter((item) =>
    item.title?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <motion.div
        initial={{opacity: 0, y: -40}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.75, ease: "easeOut"}}
        className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 py-4 lg:py-6 bg-transparent" // Убрал bg-pink-300, сделал transparent для "невидимого" вида
      >
        {/* Заголовок слева */}
        <div className="flex-1">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-gray-900 leading-tight">
            {title}
          </h1>
        </div>

        {/* Поиск справа, "невидимый" (прозрачный фон, минималистичный) */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <div className="relative">
            <Input
              type="search"
              placeholder="Поиск..."
              className="h-12 sm:h-14 lg:h-16 w-full pl-12 pr-4 bg-transparent border border-gray-300 hover:border-gray-400 focus:border-transparent focus:ring-0 rounded-md placeholder:text-gray-400 text-gray-900 text-base transition-colors duration-300" // Transparent bg, subtle border, no shadow/ring
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* Опциональная иконка для подсказки, но "невидимая" (слабая) */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.ul
        initial="hidden"
        animate="visible"
        className="flex flex-wrap sm:flex-row gap-4 sm:gap-8 font-medium text-sm sm:text-base mt-2 py-3"
      >
        {categories.map((category) => (
          <motion.li
            key={category.id}
            variants={{hidden: {opacity: 0}, visible: {opacity: 1}}}
            transition={{duration: 1}}
          >
            <Link
              href={`${basePath}/${category.categorySlug}`}
              className={`rounded-md transition cursor-pointer px-2 py-1 sm:px-0 sm:py-0 ${
                currentCategory === category.categorySlug ? "text-mainPurple" : "text-black"
              }`}
            >
              {category.category}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2"
      >
        <GenericSelector
          items={transformedStyles}
          currentValue={currentStyle}
          onChange={handleStyleChange}
          label="Стиль"
          allLabel="Любой стиль"
        />
        <GenericSelector
          items={transformedMaterials}
          currentValue={currentMaterial}
          onChange={handleMaterialChange}
          label="Материал"
          allLabel="Любой материал"
        />
        <SortSelector currentSort={currentSort} setCurrentSort={handleSortChange}/>
      </motion.div>

      <div className="mt-3 sm:mt-5">
        {isError && <p className="text-sm sm:text-base">Ошибка при загрузке</p>}

        {!isError && filteredItems && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-4 mt-4 sm:mt-6">
            {filteredItems.map((item: CatalogItem) => (
              <Link
                key={item.id}
                href={getItemLink(item, currentCategory)}
                onMouseEnter={() => {
                  if (prefetchItem) {
                    queryClient.prefetchQuery({
                      queryKey: [queryKeyPrefix, "detail", item.id],
                      queryFn: () => prefetchItem(item.id),
                    })
                  }
                }}
              >
                {renderCard(item)}
              </Link>
            ))}
          </div>
        ) : (
          !isError && (
            <div className="text-sm sm:text-base min-h-[50vh]">
              <LoadingPlaceholder/>
            </div>
          )
        )}
      </div>
    </div>
  )
}