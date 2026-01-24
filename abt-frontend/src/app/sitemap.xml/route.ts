import { NextResponse } from 'next/server'
import {fetchProducts} from "@/lib/api/products"
import {fetchCategories} from "@/lib/api/categories"
import {fetchPromotions} from "@/lib/api/promotions"
import {Category, Product} from "@/types"
import {Promotion} from "@/types"

// Типы для данных
type SitemapRoute = {
	url: string
	lastmod: string
	changefreq: 'daily' | 'weekly' | 'monthly'
	priority: string
}

function generateSiteMapXML(
	staticRoutes: SitemapRoute[],
	productRoutes: SitemapRoute[],
	categoryRoutes: SitemapRoute[],
	promotionRoutes: SitemapRoute[]  // Добавлено: параметр для маршрутов промоакций
): string {
	const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://kuhni-abt.ru'

	const renderUrl = (route: SitemapRoute) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(renderUrl).join('')}
  ${categoryRoutes.map(renderUrl).join('')}
  ${productRoutes.map(renderUrl).join('')}
  ${promotionRoutes.map(renderUrl).join('')} 
</urlset>`
}

export async function GET() {
	try {
		const currentDate = new Date().toISOString()

		// Статические маршруты
		const staticRoutes: SitemapRoute[] = [
			{
				url: '/',
				lastmod: currentDate,
				changefreq: 'daily',
				priority: '1.0',
			},
			{
				url: '/about',
				lastmod: currentDate,
				changefreq: 'monthly',
				priority: '0.8',
			},
			{
				url: '/contacts',
				lastmod: currentDate,
				changefreq: 'monthly',
				priority: '0.7',
			},
			{
				url: '/howto',
				lastmod: currentDate,
				changefreq: 'monthly',
				priority: '0.7',
			},
			{
				url: '/services',
				lastmod: currentDate,
				changefreq: 'weekly',
				priority: '0.8',
			},
			{
				url:'/reviews',
				lastmod: currentDate,
				changefreq: "weekly",
				priority: '0.7',
			}
		]

		// Данные из API
		const [products, categories, promotions] = await Promise.all([  // Добавлено: fetchPromotions
			fetchProducts(),
			fetchCategories(),
			fetchPromotions(),  // Получаем все промоакции (готовые решения)
		])

		// Создаём маппинг для категорий: от русского названия (category) к slug (categorySlug)
		const categoryMap = new Map(
			categories.map((category: Category) => [category.category, category.categorySlug])
		)

		// Функция для получения slug по названию категории (с fallback)
		const getCategorySlug = (catName: string): string => {
			return categoryMap.get(catName) || 'uncategorized'  // Fallback для неизвестных категорий
		}

		// Категории с корректным lastmod
		const categoryRoutes: SitemapRoute[] = categories.map((category: Category) => ({
			url: `/catalog/${category.categorySlug}`,
			lastmod: currentDate,
			changefreq: 'monthly',
			priority: '0.6',
		}))

		// Продукты с кодированием URL (используем маппинг, если category — строка с русским названием)
		const productRoutes: SitemapRoute[] = products
			.map((product: Product) => {
				const catSlug = typeof product.category === 'string'
					? getCategorySlug(product.category)  // Если category — строка (русское название)
					: product.category || 'uncategorized'  // Если объект или undefined

				return {
					url: `/catalog/${catSlug}/${product.id}-${product.productSlug}`,
					lastmod: currentDate,
					changefreq: 'weekly',
					priority: '0.6',
				}
			})

		// Добавлено: Маршруты для промоакций (готовых решений)
		const promotionRoutes: SitemapRoute[] = promotions
			.filter((promotion: Promotion) => promotion.id > 0)  // Базовый фильтр (предполагаем все активны; добавьте published, если есть)
			.map((promotion: Promotion) => ({
				url: `/sales/${getCategorySlug(promotion.category)}/${promotion.id}-${promotion.productSlug}`,  // ИСПРАВЛЕНО: используем slug через маппинг
				lastmod: currentDate,
				changefreq: 'weekly',
				priority: '0.6',
			}))

		const sitemap = generateSiteMapXML(
			staticRoutes,
			productRoutes,
			categoryRoutes,
			promotionRoutes  // Добавлено: передача промоакций
		)

		return new NextResponse(sitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=UTF-8',
				'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
			},
		})
	} catch (error) {
		console.error('Error generating sitemap.xml:', error)

		// Фоллбэк на простой sitemap
		const basicSitemap = generateSiteMapXML(
			[
				{
					url: '/',
					lastmod: new Date().toISOString(),
					changefreq: 'daily',
					priority: '1.0',
				},
			],
			[],
			[],
			[]  // Добавлено: пустой массив для promotionRoutes
		)

		return new NextResponse(basicSitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=UTF-8',
			},
		})
	}
}