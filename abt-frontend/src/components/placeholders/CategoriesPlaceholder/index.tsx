import React from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

export default function CategoriesPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="sm:text-5xl text-3xl font-extrabold text-center my-10">
        Каталог продукции
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-4">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="relative rounded-3xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow"
          >
            {/* Фиолетовая полоска сверху */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-mainPurple z-10"></div>
            <div className="flex flex-col p-10 pt-8">
              <Skeleton className="h-8 w-2/3 mb-3"/>
              <div className="w-full aspect-square relative overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full rounded-lg"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

