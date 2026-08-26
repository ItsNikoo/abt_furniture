'use client'

import {Product, Promotion} from '@/types/types'
import ProductPhotoCarousel from '@/components/ui/Embla/ProductPhotoCarousel'
import ProductOrderForm from '@/components/shared/Forms/ProductOrderForm'

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
          <div
            data-animate-fade=""
            className="relative w-full">
            {entity.photos && <ProductPhotoCarousel photos={entity.photos}/>}
          </div>
        </div>

        <div className="flex-1 w-full">
          <p
            data-animate-fade=""
            className="text-mainPurple text-sm sm:text-base mb-1">
            {entity.category}
          </p>

          <h1
            data-animate-fade=""
            className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
            {entity.title}
          </h1>

          {/* Блок с ценой — с проверкой на isPromotion */}
          <div
            data-animate-fade=""
            className="flex flex-col mb-6">
            {!isPromotion &&
              <p className="text-gray-400 text-sm">Цена за погонный метр</p>}

            <div className="flex items-baseline gap-1">
              <p className="text-4xl font-extrabold">
                от {entity.price.toLocaleString('ru-RU')}
              </p>
              <span className="text-gray-500 text-xl">₽</span>
            </div>
          </div>

          <div
            data-animate-fade=""
            className="mb-6">
            <ProductOrderForm entity={entity}/>
          </div>

          <div
            data-animate-fade=""
            className="border-t border-b border-gray-200 py-4">
            <div className="flex gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-gray-500 text-sm sm:text-base">Материал</p>
                <p className="text-gray-500 text-sm sm:text-base">Стиль</p>
                {isPromotion && <p className="text-gray-500 text-sm sm:text-base">Размер</p>}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="font-medium text-sm sm:text-base">{entity.material || 'Не указано'}</p>
                <p className="font-medium text-sm sm:text-base">{entity.style || 'Не указано'}</p>
                {isPromotion &&
                  <p className="font-medium text-sm sm:text-base">{"size" in entity && entity.size || 'Не указано'}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Контейнер с описанием */}
      <div
        data-animate-fade=""
        className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Описание</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {entity.description}
        </p>
      </div>
    </div>
  )
}
