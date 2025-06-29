import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="relative min-h-screen px-2 xs:px-4 sm:px-8 md:px-[50px] lg:px-[100px] py-6 bg-[linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)),url('/background_image.webp')] bg-no-repeat bg-center bg-cover">
            <div className="relative p-4 rounded-lg flex flex-col gap-6">
                <div>
                    <h1 className="text-mainPurple font-extrabold font-overpass text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-3 text-shadow">
                        Наша история – качество с 2002 года
                    </h1>
                    <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed">
                        Мы – производитель, а не посредник. И вся наша философия построена вокруг создания
                        уникального продукта, который будет ценным для покупателя и решит его проблемы.
                    </p>
                </div>

                <div>
                    <h3 className="text-mainPurple font-bold font-overpass text-base xs:text-lg sm:text-xl md:text-2xl mb-3">
                        От маленькой мастерской – к современному производству
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed mb-3">
                        Наша история начиналась с небольшой компании, где каждый предмет мебели создавался с
                        особым вниманием к деталям. В 2002 году мы сделали первый шаг – и с тех пор неустанно развиваемся, сохраняя
                        любовь к клиентам и внедряя передовые технологии.
                    </p>
                    <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed">
                        Сегодня мы – это собственное производство,
                        оснащенное высокоточным оборудованием, и команда профессионалов, которые превращают дерево и металл в стильную и
                        функциональную мебель.
                    </p>
                </div>

                <div>
                    <h3 className="text-mainPurple font-bold font-overpass text-base xs:text-lg sm:text-xl md:text-2xl mb-3">
                        Наши принципы
                    </h3>
                    <div className="space-y-2">
                        <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed">
                            <span className="font-bold">Качество без компромиссов</span> – используем только
                            проверенные материалы и фурнитуру.
                        </p>
                        <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed">
                            <span className="font-bold">Индивидуальный подход</span> – создаем мебель под Ваши
                            потребности и вкус.
                        </p>
                        <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed">
                            <span className="font-bold">Надежность</span> – более 20 лет на рынке и доверие тысяч
                            клиентов.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-mainPurple font-bold font-overpass text-base xs:text-lg sm:text-xl md:text-2xl mb-3">
                        Партнерство и развитие
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed mb-3">
                        Мы гордимся сотрудничеством с ведущими поставщиками и дизайнерами. Наши партнеры –
                        это компании, которые, как и мы, ценят экологичность, инновации и безупречный сервис.
                    </p>
                    <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed">
                        Мы всегда открыты к сотрудничеству.{" "}
                        <Link
                            href="/contacts"
                            className="text-mainPurple underline hover:text-mainPurpleHovered transition-colors"
                        >
                            Напишите нам.
                        </Link>
                    </p>
                </div>

                <div>
                    <p className="text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed mb-3">
                        Каждый наш проект – это не просто изделие, а часть вашего дома, созданная с душой. Мы
                        продолжаем расти, чтобы предлагать вам лучшие решения для уюта и комфорта.
                    </p>
                    <h3 className="text-mainPurple font-bold font-overpass text-base xs:text-lg sm:text-xl md:text-2xl mb-3">
                        Спасибо, что выбираете нас!
                    </h3>
                </div>
            </div>
        </div>
    )
}