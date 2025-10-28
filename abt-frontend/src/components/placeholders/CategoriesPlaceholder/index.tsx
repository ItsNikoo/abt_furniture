import React from 'react'
import {motion} from 'framer-motion'

export default function CategoriesPlaceholder() {
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
        {[...Array(3)].map((_, index) => (
          <motion.div
            initial={{y: 30, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.5, delay: index * 0.2}}
            viewport={{once: true}}
            key={index}
            className="flex-grow basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] max-w-full sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              {/* Скелетон изображения */}
              <div className="w-full aspect-square relative bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
                {/* Shimmer эффект */}
                <div
                  className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>

              {/* Скелетон текста */}
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <div className="h-8 w-3/4 bg-gray-400/60 rounded-lg animate-pulse"/>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

