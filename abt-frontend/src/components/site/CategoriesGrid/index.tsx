'use client'

import {Category} from '@/types'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'
import CategoriesPlaceholder from '@/components/placeholders/CategoriesPlaceholder'
import {fetchCategories} from "@/lib/api/categories";

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
        console.error('Ошибка при загрузке категорий:', error)
        setError('Не удалось загрузить категории')
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, []);

  if (loading || error || categories.length === 0) {
    return <CategoriesPlaceholder/>
  }

  return (
    <div
      className="px-4"
    >
      <motion.h1
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5, delay: 1}}
        className="sm:text-5xl text-3xl font-extrabold text-center my-10">
        Каталог продукции
      </motion.h1>

      <div className="flex flex-wrap mx-auto justify-between gap-4">
        {categories.map((category, index) => (
          <motion.div
            initial={{y: 30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: index * 0.2}}
            key={category.id}
            className="flex-grow basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] max-w-full sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]"
          >
            <Link
              href={`/catalog/${category.categorySlug}`}
            >
              <div
                className="relative overflow-hidden rounded-2xl shadow-md group"
              >
                {/* Затемнённое фото */}
                <div className="w-full aspect-square relative group-hover:scale-[1.02] duration-300">
                  <Image
                    src={category.photo}
                    alt={category.category}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                    className="object-cover transition-all duration-500 group-hover:brightness-100 brightness-50"
                  />
                </div>

                {/* Текст поверх фото */}
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <h2
                    className="text-white text-2xl font-extrabold drop-shadow-lg transition-all duration-300 group-hover:scale-105">
                    {category.category}
                  </h2>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

}