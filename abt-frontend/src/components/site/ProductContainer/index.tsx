'use client'

import { Product } from '@/types'
import ProductPhotoCarousel from '@/components/ui/Embla/ProductPhotoCarousel'
import ProductOrderContainer from '@/components/site/Orders/ProductOrderContainer'
import { motion } from 'framer-motion'
import AnimatedText from '@/components/ui/Animations/AnimatedText'

export default function ProductContainer({ product }: { product: Product }) {
  return (
    <div className="flex flex-col min-h-[75vh] lg:flex-row gap-3 sm:gap-5 mt-5 sm:mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={'w-full lg:w-1/2'}>
        {product.photos && <ProductPhotoCarousel photos={product.photos}/>}
      </motion.div>
      <div className="flex flex-col justify-center gap-3 sm:gap-5 w-full lg:w-1/2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base">{product.category}</motion.p>
          <AnimatedText
            text={product.title}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProductOrderContainer product={product}/>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={'flex flex-wrap gap-1'}>
          <p className={'text-gray-400 text-sm sm:text-base'}>Цена за погонный метр - </p>
          <p className="text-sm sm:text-base">{product.price} руб.</p>
        </motion.div>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={'text-gray-400 text-sm sm:text-base'}>{product.description}</motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-b border-gray-200 py-3 sm:py-4 w-full sm:w-3/4 lg:w-1/2">
          <div className="flex">
            <div className="w-1/2">
              <p className="text-gray-500 text-sm sm:text-base">Материал</p>
              <p className="text-gray-500 text-sm sm:text-base">Стиль</p>
            </div>
            <div className="w-1/2">
              <p className="font-medium text-sm sm:text-base">{product.material || 'Не указано'}</p>
              <p className="font-medium text-sm sm:text-base">{product.style || 'Не указано'}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
