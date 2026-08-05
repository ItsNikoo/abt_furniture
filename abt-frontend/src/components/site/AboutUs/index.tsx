'use client'

import Link from 'next/link'
import { BookOpen, Handshake, User } from 'lucide-react'
import { fadeInView } from '@/lib/animations'

export default function AboutUs() {
  return (
    <div className="py-8">
      <div
        {...fadeInView}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-gray-950 font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
          Наша история – качество с 2002 года
        </h1>
        <p className="max-w-4xl text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          <span className="font-bold">Мы – производитель, а не посредник.</span> И вся наша философия построена вокруг
          создания
          уникального продукта, который будет ценным для покупателя и решит его проблемы.
        </p>
      </div>

      <div className="space-y-5 md:space-y-6">
        {/* История с иконкой */}
        <div
          {...fadeInView}
          className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
          <div
            className="flex-shrink-0 flex items-center justify-center bg-mainPurple/10 rounded-lg w-12 h-12 sm:w-14 sm:h-14 mr-2 mt-1">
            <BookOpen className="text-mainPurple w-6 h-6 sm:w-7 sm:h-7"/>
          </div>
          <div>
            <h3 className="text-gray-950 font-bold text-lg sm:text-xl md:text-2xl mb-3">
              От маленькой мастерской – к современному производству
            </h3>
            <p className="text-xs xs:text-sm sm:text-base md:text-[18px] text-gray-700 leading-relaxed mb-3">
              Наша история начиналась с небольшой компании, где каждый предмет мебели создавался с
              особым вниманием к деталям. В 2002 году мы сделали первый шаг – и с тех пор неустанно развиваемся,
              сохраняя
              любовь к клиентам и внедряя передовые технологии.
            </p>
            <p className="text-xs xs:text-sm sm:text-base md:text-[18px] text-gray-700 leading-relaxed">
              Сегодня мы – это собственное производство,
              оснащенное высокоточным оборудованием, и команда профессионалов, которые превращают дерево и металл в
              стильную и
              функциональную мебель.
            </p>
          </div>
        </div>

        {/* Наши принципы с иконкой */}
        <div
          {...fadeInView}
          className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <div className="hidden sm:flex flex-col items-center">
              <div
                className="flex-shrink-0 flex items-center justify-center bg-mainPurple/10 rounded-lg w-12 h-12 sm:w-14 sm:h-14 mr-2 mt-1">
                <User className="text-mainPurple w-6 h-6 sm:w-7 sm:h-7"/>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-950 font-bold text-lg sm:text-xl md:text-2xl mb-3">
                Наши принципы
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-3 items-center">
                  <div
                    className="bg-mainPurple/10 rounded-lg flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                    <span className="text-mainPurple font-bold text-base sm:text-lg md:text-xl">✓</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[18px] text-gray-700 leading-relaxed">
                    <span className="font-bold">Качество без компромиссов</span> – используем только проверенные
                    материалы и фурнитуру.
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div
                    className="bg-mainPurple/10 rounded-lg flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                    <span className="text-mainPurple font-bold text-base sm:text-lg md:text-xl">✓</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[18px] text-gray-700 leading-relaxed">
                    <span className="font-bold">Индивидуальный подход</span> – создаем мебель под Ваши потребности и
                    вкус.
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div
                    className="bg-mainPurple/10 rounded-lg flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                    <span className="text-mainPurple font-bold text-base sm:text-lg md:text-xl">✓</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[18px] text-gray-700 leading-relaxed">
                    <span className="font-bold">Надежность</span> – более 20 лет на рынке и доверие тысяч клиентов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Партнерство и развитие с иконкой */}
        <div
          {...fadeInView}
          className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
          <div
            className="flex-shrink-0 flex items-center justify-center bg-mainPurple/10 rounded-lg w-12 h-12 sm:w-14 sm:h-14 mr-2 mt-1">
            <Handshake className="text-mainPurple w-6 h-6 sm:w-7 sm:h-7"/>
          </div>
          <div>
            <h3 className="text-gray-950 font-bold text-lg sm:text-xl md:text-2xl mb-3">
              Партнерство и развитие
            </h3>
            <p className="text-xs xs:text-sm sm:text-base md:text-[18px] text-gray-700 leading-relaxed mb-3">
              Мы гордимся сотрудничеством с ведущими поставщиками и дизайнерами. Наши партнеры –
              это компании, которые, как и мы, ценят экологичность, инновации и безупречный сервис.
            </p>
            <p className="text-xs xs:text-sm sm:text-base md:text-[18px] text-gray-700 leading-relaxed">
              Мы всегда открыты к сотрудничеству.{' '}
              <Link
                href="/contacts"
                className="text-mainPurple underline hover:text-mainPurpleHovered transition-colors"
              >
                Напишите нам.
              </Link>
            </p>
          </div>
        </div>

        {/* Финальный блок без иконки */}
        <div
          {...fadeInView}
          className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs xs:text-sm sm:text-base md:text-[18px] text-gray-700 leading-relaxed mb-3">
            Каждый наш проект – это не просто изделие, а часть вашего дома, созданная с душой. Мы
            продолжаем расти, чтобы предлагать вам лучшие решения для уюта и комфорта.
          </p>
          <h3 className="text-gray-950 font-bold text-lg sm:text-xl md:text-2xl mb-3">
            Спасибо, что выбираете нас!
          </h3>
        </div>
      </div>
    </div>
  )
}
