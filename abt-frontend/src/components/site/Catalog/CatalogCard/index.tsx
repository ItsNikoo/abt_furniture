import PhotoCarousel from '@/components/ui/Embla/PhotoCarousel'
import {Product} from '@/types'
import {motion} from 'framer-motion'

export default function CatalogCard({product}: { product: Product }) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="overflow-hidden rounded-lg mb-2">
      {product.photos && (
        <div className="relative overflow-hidden aspect-[16/9]"> {/* Добавлен aspect-[16/9] для соотношения 16:9; убран py-3, чтобы не ломать aspect */}
          <div className="relative pointer-events-auto h-full w-full"> {/* h-full w-full для заполнения контейнера */}
            <PhotoCarousel
              photos={product.photos}
              className="h-full w-full" // Предполагаем, что PhotoCarousel принимает className пропс; если нет, добавьте в его код
            />
            <div
              className="absolute top-3 left-3 bg-mainPurple text-white text-[14px] font-bold px-2 py-1 rounded-md z-20">
              {product.style}
            </div>
          </div>
        </div>
      )}
      <div
        className="flex flex-col px-4 my-2 pb-3">
        <div>
          <p className="text-gray-400 text-sm">{product.category}</p>
          <h2 className="text-3xl font-extrabold font-montserrat">{product.title}</h2>
        </div>
        <div className="flex flex-row gap-1.5">
          <p className="text-gray-400">Цена за погонный метр - </p>
          <p>{product.price} руб.</p>
        </div>
      </div>
    </motion.div>
  )
}