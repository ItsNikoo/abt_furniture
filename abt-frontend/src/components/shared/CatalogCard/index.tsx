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
      className="overflow-hidden rounded-lg mb-2">
      {entity.photos && (
        <div className="relative overflow-hidden py-3">
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
        <div className="flex flex-col mt-2"> {/* Изменили на flex-col для вертикального стека, чтобы цена выделялась */}
          {!isPromotion && <p className="text-gray-400 text-sm">Цена за погонный метр</p>} {/* Убрали " - ", сделали короче */}
          {isPromotion && (
            <div className="flex items-baseline gap-1 mb-1"> {/* Обёртка для выравнивания, с отступом снизу */}
          <p> {/* Заметный: средний размер, жирный, бренд-цвет */}
            {"size" in entity ? entity.size : ""}
          </p>
        </div>
        )}
          <div className="flex items-baseline gap-1"> {/* Обернули цену для выравнивания */}
            <p className="text-3xl font-bold"> {/* Увеличили размер, жирный, бренд-цвет для заметности */}
              {entity.price.toLocaleString('ru-RU')} {/* Форматирование с пробелами: 25 000 */}
            </p>
            <span className="text-gray-500 text-lg">₽</span> {/* Символ ₽ вместо "руб.", меньший размер */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}