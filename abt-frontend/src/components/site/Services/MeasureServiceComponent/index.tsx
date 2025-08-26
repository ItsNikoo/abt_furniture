'use client'

import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MeasureServiceComponent() {
  return (
    <div className="relative min-h-[60vh] px-4 md:px-[50px] lg:px-[100px] py-[30px] flex flex-col gap-8 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-[350px] flex-shrink-0">
          <motion.div
            initial={{opacity: 0, scale: 1.05}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 1}}
            className="relative w-full h-56 md:h-[300px]">
            <Image
              src="/services_pictures/picture2.png"
              alt="Замер помещения"
              fill={false}
              width={800}
              height={800}
              className="rounded-xl object-cover w-full h-full"
              style={{width: "100%", height: "100%"}}
              priority
            />
          </motion.div>
        </div>
        <div className="flex-1">
          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
            Замер помещения
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.2}}
            className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
            <span className="font-bold">Точный замер — залог идеальной мебели</span>
            <br/>
            Наш специалист приедет, чтобы точно измерить
            помещение, учесть все особенности стен, углов, выступов и
            коммуникаций. Это гарантирует, что мебель встанет на своё место без
            зазоров и перекосов.
          </motion.p>
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.4}}
            className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            <span className="font-bold">Всё продумано до миллиметра</span>
            <br/>
            Замер позволяет нам спланировать проект максимально точно — без
            переделок и сюрпризов. Это важный этап, который обеспечивает плотную
            посадку, надёжность конструкции и идеальную интеграцию в интерьер.
          </motion.p>
        </div>
      </div>
      {/* CTA Section */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.6}}
        className="mt-8 sm:mt-12 text-center">
        <div
          className="bg-gradient-to-r from-mainPurple to-mainPurple/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
          <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
            Хотите вызвать замерщика?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            Оставьте заявку или свяжитесь с нами — мы бесплатно проконсультируем
            и согласуем удобное время для визита специалиста!
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