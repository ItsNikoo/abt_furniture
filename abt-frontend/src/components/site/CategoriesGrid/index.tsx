'use client'

import { Category } from '@/types'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LoadingPlaceholder from '@/components/placeholders/LoadingPlaceholder'
import CategoriesPlaceholder from '@/components/placeholders/CategoriesPlaceholder'

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/categories').then(response => {
      if (!response.ok) throw new Error('Не удалось загрузить категории')
      return response.json()
    }).then(data => {
      // Проверяем структуру ответа
      if (Array.isArray(data)) {
        setCategories(data)
      } else if (data.results && Array.isArray(data.results)) {
        // Если API возвращает { results: [...] }
        setCategories(data.results)
      } else if (data.items && Array.isArray(data.items)) {
        // Если API возвращает { items: [...] }
        setCategories(data.items)
      } else if (data.data && Array.isArray(data.data)) {
        // Если API возвращает { data: [...] }
        setCategories(data.data)
      } else {
        // Если другая структура - логируем и устанавливаем пустой массив
        console.warn('Unexpected API response structure:', data)
        setCategories([])
      }
    }).catch(error => {
      console.error('Fetch error:', error)
      setError(error.message)
      setCategories([]) // На всякий случай пустой массив
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div><LoadingPlaceholder/></div>
  if (error || categories.length === 0) return <div><CategoriesPlaceholder/></div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="sm:text-5xl text-3xl font-extrabold text-center my-10">Каталог продукции</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/catalog/${category.categorySlug}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative rounded-3xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow">
              {/* Фиолетовая полоска сверху */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-mainPurple z-10"></div>

              {/* Контент */}
              <div className="flex flex-col p-10 pt-8">
                <h2 className="text-3xl mb-3 font-extrabold">{category.category}</h2>

                {/* Квадратный контейнер под изображение */}
                <div className="w-full aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={category.photo}
                    alt={category.category}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
