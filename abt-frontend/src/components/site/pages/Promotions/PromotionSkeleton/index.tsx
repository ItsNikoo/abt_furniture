export default function PromotionsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Заголовок skeleton */}
      <div className="text-center space-y-4">
        <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto" />
        <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto" />
      </div>

      {/* Фильтры skeleton */}
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Карточки skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-200" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-12 bg-gray-200 rounded-lg w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}