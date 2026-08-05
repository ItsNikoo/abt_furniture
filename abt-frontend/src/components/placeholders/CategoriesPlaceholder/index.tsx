import React from 'react'

export default function CategoriesPlaceholder() {
  return (
    <div
      className="px-4 mb-4"
    >
      <h2
        data-animate-fade=""
        className="text-xl sm:text-3xl font-extrabold text-center my-10">
        Каталог продукции
      </h2>

      <div className="flex flex-wrap mx-auto justify-between gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            data-animate-fade=""
            key={index}
            className="flex-grow basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] max-w-full sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]"
          >
            <div className="relative overflow-hidden shadow-md">
              {/* Скелетон изображения */}
              <div className="w-full aspect-square relative bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
                {/* Shimmer эффект */}
                <div
                  className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>

              {/* Скелетон текста */}
              <div className="absolute inset-0 flex items-end p-4 py-8">
                <div className="h-8 w-3/4 bg-gray-400/60 rounded-lg animate-pulse"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

