import PhotoCarousel from '@/components/ui/Embla/PhotoCarousel'
import {Product, Promotion} from '@/types'
import {motion} from 'framer-motion'

interface CatalogCardProps {
  entity: Promotion | Product,
  isPromotion?: boolean,
}

export default function CatalogCard({entity, isPromotion = false}: CatalogCardProps) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="group overflow-hidden bg-white rounded-lg border border-gray-200">
      {entity.photos && (
        <div className="relative overflow-hidden aspect-video bg-gray-100">
          <div className="relative pointer-events-auto h-full w-full">
            <PhotoCarousel
              photos={entity.photos}
              className="h-full w-full"
              imageClassName="object-cover"
              slideClassName="bg-gray-100"
              aspectRatio="h-full"
              showDots={false}
            />
            {entity.style && (
              <div className="absolute top-3 left-3 bg-mainPurple text-white text-xs font-semibold px-2.5 py-1 rounded-lg z-20">
                {entity.style}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col p-4 sm:p-5">
        <p className="text-xs font-medium tracking-wide uppercase text-gray-400">
          {entity.category}
        </p>
        <h2 className="mt-1 text-lg sm:text-xl font-extrabold font-montserrat leading-snug text-gray-900 line-clamp-2">
          {entity.title}
        </h2>

        {isPromotion && "size" in entity && entity.size && (
          <p className="mt-1.5 text-sm text-gray-500">{entity.size}</p>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline justify-between">
          {!isPromotion && (
            <p className="text-xs text-gray-400">Цена за погонный метр</p>
          )}
          <div className="flex items-baseline gap-1 ml-auto">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {entity.price.toLocaleString('ru-RU')}
            </p>
            <span className="text-gray-400 text-sm">₽</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}