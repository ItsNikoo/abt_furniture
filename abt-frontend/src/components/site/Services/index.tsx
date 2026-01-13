'use client'

import Link from 'next/link'
import { Service } from '@/types'
import { services } from '@/components/site/Services/services'
import { motion } from 'framer-motion'
import ServiceCard from "@/components/site/Services/ServiceCard";

export default function Services() {
  return (
    <div className="my-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-mainPurple font-extrabold text-xl sm:text-2xl md:text-3xl mb-4">
          Идеальная корпусная мебель на заказ — дизайн, изготовление, установка
        </h1>
        <p className="mb-6">
          Помимо мебели разных фасонов и стилей{' '}
          <span className="font-bold">мы предоставляем обширный спектр услуг</span>, чтобы вы получили максимум
          удовольствия и минимум “рутины”.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-8">
        {services.map((service: Service) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: service.id * 0.2 }}
            viewport={{ once: true }}
            key={service.id}>
            <ServiceCard service={service}/>
          </motion.div>
        ))}
      </div>
      {/* Фиолетовый CTA контейнер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mt-12 text-center">
        <div
          className="bg-gradient-to-r from-mainPurple to-mainPurple/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
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
              className="bg-white text-mainPurple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/contacts"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-mainPurple transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
