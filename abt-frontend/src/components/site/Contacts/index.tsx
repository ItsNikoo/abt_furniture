import {Phone, MessageCircle, Mail, Clock, ExternalLink, UserRound} from "lucide-react";
import Link from "next/link";

export default function Contacts() {
  return (
    <div
      className="relative mt-[10px] px-4 md:px-[50px] lg:px-[100px] py-[30px] flex flex-col gap-4 h-[80vh] z-[1] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('/background_image.webp')] before:bg-no-repeat before:bg-center before:bg-cover before:opacity-20 before:z-[-1]">
      <div className="mb-6 sm:mb-8">
        <h1 className='text-mainPurple font-extrabold text-3xl sm:text-3xl md:text-4xl mb-3'>
          Контакты нашей компании
        </h1>
        <p className='text-sm sm:text-base md:text-[18px] text-gray-700 leading-relaxed'>
          Мы всегда рады помочь Вам создать мебель Вашей мечты! Обращайтесь удобным способом –
          ответим быстро и подробно проконсультируем.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Телефон */}
        <div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-mainPurple/90 p-2 rounded-full">
              <Phone className="w-5 h-5 text-white"/>
            </div>
            <h3 className='text-mainPurple font-semibold text-lg sm:text-xl'>Позвоните нам</h3>
          </div>
          <div className="space-y-2">
            <Link
              href="tel:+79267232880"
              className="block text-sm sm:text-base md:text-[18px] hover:text-mainPurple transition-colors"
            >
              <span className='font-bold'>Телефон:</span> +7 (926) 723-28-80
            </Link>
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
              <Clock className="w-4 h-4"/>
              <span>9:00 до 19:00 (без выходных)</span>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-mainPurple/90 p-2 rounded-full">
              <MessageCircle className="w-5 h-5 text-white"/>
            </div>
            <h3 className='text-mainPurple font-semibold text-lg sm:text-xl'>Напишите в WhatsApp</h3>
          </div>
          <div className="space-y-2">
            <Link
              href="https://wa.me/79267232880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm sm:text-base md:text-[18px] hover:text-green-600 transition-colors"
            >
              <span><span className='font-bold'>Телефон:</span> +7 (926) 723-28-80</span>
              <ExternalLink className="w-4 h-4"/>
            </Link>
            <p className='text-sm sm:text-base md:text-[18px] text-gray-600'>
              Отправьте фото, эскиз или вопрос – обсудим Ваш проект в чате!
            </p>
          </div>
        </div>

        {/* Email */}
        <div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-mainPurple/90 p-2 rounded-full">
              <Mail className="w-5 h-5 text-white"/>
            </div>
            <h3 className='text-mainPurple font-semibold text-lg sm:text-xl'>Напишите на почту</h3>
          </div>
          <div className="space-y-2">
            <Link
              href="mailto:info@kuhni-abt.ru"
              className="block text-sm sm:text-base md:text-[18px] hover:text-blue-600 transition-colors"
            >
              <span className='font-bold'>Email:</span> info@kuhni-abt.ru
            </Link>
            <p className='text-sm sm:text-base md:text-[18px] text-gray-600'>
              Прикрепляйте планировки, размеры и пожелания – мы подготовим расчет.
            </p>
          </div>
        </div>
        {/* Шоурум */}
        <div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-mainPurple/90 p-2 rounded-full">
              <UserRound className="w-5 h-5 text-white"/>
            </div>
            <h3 className='text-mainPurple font-semibold text-lg sm:text-xl'>Посетите наш салон</h3>
          </div>
          <div className="space-y-2">
            <p className="block text-sm sm:text-base md:text-[18px] hover:text-mainPurple transition-colors cursor-pointer">
              <span className='font-bold'>Адрес:</span> Балашиха, Железнодорожный, Керамическая, 2Б</p>
            <p className='text-sm sm:text-base md:text-[18px] text-gray-600'>
              Пожалуйста, согласуйте время, и мы будем ждать вас!.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}