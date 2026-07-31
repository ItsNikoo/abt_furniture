'use client'

import Link from 'next/link'
import { Service } from '@/types'
import { services } from '@/components/site/Services/services'
import { motion } from 'framer-motion'
import ServiceCard from "@/components/site/Services/ServiceCard"
import { fadeInView } from '@/lib/animations'

export default function Services() {
  return (
    <div className="py-8">
      <motion.div
        {...fadeInView}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-gray-950 font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
          Идеальная корпусная мебель на заказ — дизайн, изготовление, установка
        </h1>
        <p className="max-w-4xl text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          Помимо мебели разных фасонов и стилей{' '}
          <span className="font-bold">мы предоставляем обширный спектр услуг</span>, чтобы вы получили максимум
          удовольствия и минимум “рутины”.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-5 md:gap-6">
        {services.map((service: Service) => (
          <motion.div
            {...fadeInView}
            key={service.id}>
            <ServiceCard service={service}/>
          </motion.div>
        ))}
      </div>
      {/* Фиолетовый CTA контейнер */}
      <motion.div
        {...fadeInView}
        className="mt-8 sm:mt-12 text-center">
        <div
          className="bg-mainPurple rounded-lg p-6 sm:p-8 lg:p-10 text-white shadow-sm">
          <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
            Не нашли нужную услугу?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            Мы готовы реализовать любые задачи по мебели и интерьеру. Свяжитесь с нами — подберём индивидуальное
            решение!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/catalog"
              className="bg-white text-mainPurple px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/contacts"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-mainPurple transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
