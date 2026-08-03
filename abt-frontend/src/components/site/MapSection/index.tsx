'use client'

import {motion} from "framer-motion"
import {fadeInView} from '@/lib/animations'
import Link from "next/link";

export default function MapSection() {
  return (
    <motion.div
      {...fadeInView}
      className="flex flex-col items-center gap-4 py-6 px-4">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">Посетите наш офис</h2>
        <p className="text-md text-gray-600 max-w-2xl mx-auto px-4">
          Если у вас появились вопросы, мы готовы проконсультировать вас лично! <span className="font-bold">Согласуйте с нами время, и мы будем вас ждать!</span>
        </p>
        <Link className={"text-mainPurple"} href={"/contacts"}>Наши контакты</Link>
      </div>

      <div className="relative py-6 w-[1000px] max-w-full h-[500px] rounded-lg">
        <iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=170232015961"
                className="absolute inset-0 w-full h-full border-0 rounded-lg"
                allowFullScreen></iframe>
      </div>
    </motion.div>
  )
}