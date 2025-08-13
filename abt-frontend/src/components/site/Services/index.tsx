import Link from "next/link"
import {Service} from "@/types"
import {services} from "@/components/site/Services/services"
import Image from "next/image"

function ServiceCard({service}: { service: Service }) {
  const isReversed = service.id % 2 === 0
  return (
    <div
      className={`flex flex-col md:flex-row shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-5xl mx-auto rounded-xl p-6 md:p-[50px] ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full h-56 md:w-[300px] md:h-[300px] flex-shrink-0 relative mb-6 md:mb-0">
        {service.image && (
          <Image
            className="rounded-xl object-cover"
            src={service.image}
            alt={service.title}
            fill={false}
            width={1200}
            height={1200}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <div className="flex-1 p-0 md:p-8 flex flex-col justify-center">
        <h3 className="font-extrabold text-xl md:text-2xl mb-2">{service.title}</h3>
        <p className="text-base mb-2">{service.description}</p>
        {service.link && (
          <Link
            href={service.link}
            className="text-mainPurple underline text-sm mt-2 inline-block"
          >
            Подробнее
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <div className="my-4">
      <h1 className="text-mainPurple font-extrabold text-xl sm:text-2xl md:text-3xl mb-4">
        Идеальная корпусная мебель на заказ — дизайн, изготовление, установка
      </h1>
      <p className="mb-6">
        Помимо мебели разных фасонов и стилей{" "}
        <span className="font-bold">мы предоставляем обширный спектр услуг</span>, чтобы вы получили максимум удовольствия и минимум “рутины”.
      </p>
      <div className="grid grid-cols-1 gap-8">
        {services.map((service: Service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      {/* Фиолетовый CTA контейнер */}
      <div className="mt-8 sm:mt-12 text-center">
        <div className="bg-gradient-to-r from-mainPurple to-mainPurple/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
          <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
            Не нашли нужную услугу?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            Мы готовы реализовать любые задачи по мебели и интерьеру. Свяжитесь с нами — подберём индивидуальное решение!
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
      </div>
    </div>
  )
}