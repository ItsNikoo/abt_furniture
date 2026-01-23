'use client'

import {Product, Promotion} from '@/types'
import ProductPhotoCarousel from '@/components/ui/Embla/ProductPhotoCarousel'
import ProductOrderContainer from '@/components/site/Orders/ProductOrderContainer'
import {motion} from 'framer-motion'

interface Props {
  entity: Product | Promotion,
  isPromotion?: boolean,
}

export default function ProductContainer({entity, isPromotion = false}: Props) {
  return (
    <div className="relative py-[30px] flex flex-col gap-8 bg-white">
      {/* Контейнер с фото и информацией */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <motion.div
            initial={{opacity: 0, scale: 1.05}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 1}}
            className="relative w-full">
            {entity.photos && <ProductPhotoCarousel photos={entity.photos}/>}
          </motion.div>
        </div>

        <div className="flex-1 w-full">
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="text-gray-400 text-sm sm:text-base mb-2">
            {entity.category}
          </motion.p>

          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.2}}
            className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
            {entity.title}
          </motion.h1>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.4}}
            className="mb-6">
            <ProductOrderContainer entity={entity}/>
          </motion.div>

          {/* Блок с ценой — обновлённый, с проверкой на isPromotion */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.6}}
            className="flex flex-col gap-1 mb-6">
            {!isPromotion &&
                <p className="text-gray-400 text-sm">Цена за погонный метр</p>}

            <div className="flex items-baseline gap-1">
              <p className="text-4xl font-bold">
                {entity.price.toLocaleString('ru-RU')}
              </p>
              <span className="text-gray-500 text-xl">₽</span>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.8}}
            className="border-t border-b border-gray-200 py-4">
            <div className="flex gap-8">
              <div className="flex-1">
                <p className="text-gray-500 text-sm sm:text-base mb-2">Материал</p>
                <p className="text-gray-500 text-sm sm:text-base mb-2">Стиль</p>
                {isPromotion && <p className="text-gray-500 text-sm sm:text-base">Размер</p>}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base mb-2">{entity.material || 'Не указано'}</p>
                <p className="font-medium text-sm sm:text-base mb-2">{entity.style || 'Не указано'}</p>
                {isPromotion &&
                    <p className="font-medium text-sm sm:text-base">{"size" in entity && entity.size || 'Не указано'}</p>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Контейнер с описанием */
      }
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 1}}
        className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Описание</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {entity.description}
        </p>
      </motion.div>
    </div>
  )
}