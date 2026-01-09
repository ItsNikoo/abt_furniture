import { NextResponse } from 'next/server'
import {fetchProducts} from "@/lib/api/products"
import {fetchCategories} from "@/lib/api/categories"
import {Category} from "@/types"

// Типы для данных
type SitemapRoute = {
	url: string
	lastmod: string
	changefreq: 'daily' | 'weekly' | 'monthly'
	priority: string
}

type Product = {
	id: string | number
	productSlug: string // ИСПРАВЛЕНО: было slug
	title: string
	updatedAt?: string
	published?: boolean
	category?: {
		slug?: string
	}
}


function generateSiteMapXML(
	staticRoutes: SitemapRoute[],
	productRoutes: SitemapRoute[],
	categoryRoutes: SitemapRoute[]
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
		]

		// Данные из API
		const [products, categories] = await Promise.all([
			fetchProducts(),
			fetchCategories(),
		])

		// Категории с корректным lastmod
		const categoryRoutes: SitemapRoute[] = categories.map((category: Category) => ({
			url: `/catalog/${category.categorySlug}`,
			lastmod: currentDate,
			changefreq: 'monthly',
			priority: '0.6',
		}))

		// Продукты с кодированием URL
		const productRoutes: SitemapRoute[] = products
			.filter((product: Product) => product.published !== false)
			.map((product: Product) => {
				// ИСПРАВЛЕНО: используем productSlug напрямую
				const slug = product.productSlug || `product-${product.id}`

				// Формируем URL без кодирования (slug уже на латинице)
				const rawUrl = `/catalog/${product.category?.slug || 'products'}/${product.id}-${slug}`

				return {
					url: rawUrl, // ИСПРАВЛЕНО: не нужно кодировать, slug уже латиница
					lastmod: product.updatedAt
						? new Date(product.updatedAt).toISOString()
						: currentDate,
					changefreq: 'weekly',
					priority: '0.5',
				}
			})

		const sitemap = generateSiteMapXML(
			staticRoutes,
			productRoutes,
			categoryRoutes
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
			[]
		)

		return new NextResponse(basicSitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=UTF-8',
			},
		})
	}
}