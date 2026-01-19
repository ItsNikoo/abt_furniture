import PhotoCarousel from '@/components/ui/Embla/PhotoCarousel'
import {Product, Promotion} from '@/types'
import {motion} from 'framer-motion'

interface CatalogCardProps {
  entity: Promotion | Product
}

export default function CatalogCard({entity}: CatalogCardProps) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="overflow-hidden rounded-lg mb-2">
      {entity.photos && (
        <div className="relative overflow-hidden  py-3">
          <div className="relative pointer-events-auto">
            <PhotoCarousel photos={entity.photos}/>
            <div
              className="absolute top-3 left-3 bg-mainPurple text-white text-[14px] font-bold px-2 py-1 rounded-md z-20">
              {entity.style}
            </div>
          </div>
        </div>
      )}
      <div
        className="flex flex-col px-4 my-2 pb-3">
        <div>
          <p className="text-gray-400 text-sm">{entity.category}</p>
          <h2 className="text-3xl font-extrabold font-montserrat">{entity.title}</h2>
        </div>
        <div className="flex flex-row gap-1.5">
          <p className="text-gray-400">Цена за погонный метр - </p>
          <p>{entity.price} руб.</p>
        </div>
      </div>
    </motion.div>
  )
}
