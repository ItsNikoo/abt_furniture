import React from 'react'

export default function LoadingPlaceholder() {
  const skeletons = Array.from({ length: 6 })

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 animate-pulse">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-gray-100 overflow-hidden"
        >
          {/* Изображение */}
          <div className="bg-gray-200 h-60 w-full" />

          {/* Контент */}
          <div className="flex flex-col justify-between p-4 sm:w-2/3 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
