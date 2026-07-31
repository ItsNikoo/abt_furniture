'use client'

import {Category} from '@/types'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'
import CategoriesPlaceholder from '@/components/placeholders/CategoriesPlaceholder'
import {fetchCategories} from '@/lib/api/categories'

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error(error)
        setError('Не удалось загрузить категории')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading || error || categories.length === 0) {
    return <CategoriesPlaceholder/>
  }

  return (
    <section className="mb-10">
      {/* Заголовок */}
      <motion.h2
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className="text-xl sm:text-3xl font-extrabold text-center md:mb-10 mb-6"
      >
        Каталог продукции
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: index * 0.1}}
          >
            <Link href={`/catalog/${category.categorySlug}`}>
              <div className="group relative h-[420px] overflow-hidden shadow-lg">
                <Image
                  src={category.photo}
                  alt={category.category}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

                <div className="absolute bottom-0 p-6">
                  <h2 className="text-white text-2xl font-bold mb-2">
                    {category.category}
                  </h2>

                  <span
                    className="inline-block text-sm text-white/80 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Смотреть категорию →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
