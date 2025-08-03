import PhotoCarousel from '@/components/ui/Embla/PhotoCarousel'
import { Product } from '@/types'

export default function CatalogCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden">
      {product.photos && (
        <div className="relative overflow-hidden">
          {/* Обертка карусели с относительным позиционированием */}
          <div className="relative pointer-events-auto m-5">
            <PhotoCarousel photos={product.photos} />

            {/* Фиолетовый бейдж - теперь позиционируется относительно карусели */}
            <div
              className="absolute top-3 left-3 bg-mainPurple text-white text-[14px] font-bold px-2 py-1 rounded-md z-20">
              {product.style}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 px-4 mb-2">
        <div>
          <p className="text-gray-400 text-sm">{product.category}</p>
          <h2 className="text-3xl font-bold font-montserrat">{product.title}</h2>
        </div>
        <div className="flex flex-row gap-1.5">
          <p className="text-gray-400">Цена за погонный метр - </p>
          <p>{product.price} руб.</p>
        </div>
      </div>
    </div>
  )
}
