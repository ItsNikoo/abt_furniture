'use client'

import {motion} from 'framer-motion'
import {Clock, ExternalLink, Mail, MessageCircle, Phone, UserRound} from 'lucide-react'
import Link from 'next/link'
import { fadeInView } from '@/lib/animations'

export default function Contacts() {
    return (
        <div className="py-8">
            {/* Header */}
            <motion.div
                {...fadeInView}
                className="mb-8 md:mb-12">
                <h1 className="text-gray-950 font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
                    Контакты нашей компании
                </h1>
                <p className="max-w-4xl text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Мы всегда рады помочь Вам создать мебель Вашей мечты! Обращайтесь удобным способом – ответим быстро
                    и подробно
                    проконсультируем.
                </p>
            </motion.div>

            {/* Контактные карточки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Телефон */}
                <motion.div
                    {...fadeInView}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-mainPurple/90 p-2 rounded-lg">
                            <Phone className="w-5 h-5 text-white"/>
                        </div>
                        <h3 className="text-gray-950 font-semibold text-lg sm:text-xl">Позвоните нам</h3>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <span className="font-bold">Наши телефоны:</span>
                        <Link
                            href="tel:+79267232880"
                            className="block text-sm sm:text-base md:text-[18px] hover:text-mainPurple transition-colors"
                        >
                            +7 (926) 723-28-80 (Балашиха)
                        </Link>
                        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                            <Clock className="w-4 h-4"/>
                            <span>9:00 до 19:00 (без выходных)</span>
                        </div>
                        <Link
                            href="tel:+79197626655"
                            className="block text-sm sm:text-base md:text-[18px] hover:text-mainPurple transition-colors"
                        >
                            +7 (919) 762-66-55 (Москва, м. Каширская)
                        </Link>
                        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                            <Clock className="w-4 h-4"/>
                            <span>11:00 до 19:00 (без выходных)</span>
                        </div>
                    </div>
                </motion.div>

                {/* WhatsApp */}
                <motion.div
                    {...fadeInView}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-mainPurple/90 p-2 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-white"/>
                        </div>
                        <h3 className="text-gray-950 font-semibold text-lg sm:text-xl">Напишите в WhatsApp</h3>
                    </div>
                    <div className="space-y-2 flex flex-col text-gray-700">
                        <span className="font-bold">Наши телефоны:</span>
                        <Link
                            href="https://wa.me/79267232880"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm sm:text-base md:text-[18px] hover:text-green-600 transition-colors"
                        >
                            <span>+7 (926) 723-28-80 (Балашиха)</span>
                            <ExternalLink className="w-4 h-4"/>
                        </Link>
                        <Link
                            href="https://wa.me/79197626655"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm sm:text-base md:text-[18px] hover:text-green-600 transition-colors"
                        >
                            <span> +7 (919) 762-66-55 (Москва, м. Каширская)</span>
                            <ExternalLink className="w-4 h-4"/>
                        </Link>
                        <p className="text-sm sm:text-base md:text-[18px] text-gray-600">
                            Отправьте фото, эскиз или вопрос – обсудим Ваш проект в чате!
                        </p>
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div
                    {...fadeInView}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-mainPurple/90 p-2 rounded-lg">
                            <Mail className="w-5 h-5 text-white"/>
                        </div>
                        <h3 className="text-gray-950 font-semibold text-lg sm:text-xl">Напишите на почту</h3>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <Link
                            href="mailto:info@kuhni-abt.ru"
                            className="block text-sm sm:text-base md:text-[18px] hover:text-blue-600 transition-colors"
                        >
                            <span className="font-bold">Email:</span> info@kuhni-abt.ru
                        </Link>
                        <p className="text-sm sm:text-base md:text-[18px] text-gray-600">
                            Прикрепляйте планировки, размеры и пожелания – мы подготовим расчет.
                        </p>
                    </div>
                </motion.div>
                {/* Шоурум */}
                <motion.div
                    {...fadeInView}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-mainPurple/90 p-2 rounded-lg">
                            <UserRound className="w-5 h-5 text-white"/>
                        </div>
                        <h3 className="text-gray-950 font-semibold text-lg sm:text-xl">Посетите наши салоны</h3>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <span className='font-bold text-base'>Наши адреса:</span>
                        <p
                            className="block text-sm sm:text-base md:text-[18px] hover:text-mainPurple transition-colors cursor-pointer">Балашиха, Железнодорожный, Керамическая, 2Б</p>
                        <p
                            className="block text-sm sm:text-base md:text-[18px] hover:text-mainPurple transition-colors cursor-pointer">Г.Москва, Каширское шоссе, д.5, корп.1</p>
                        <p className="text-sm sm:text-base md:text-[18px] text-gray-600">
                            Пожалуйста, согласуйте время, и мы будем ждать вас!.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
