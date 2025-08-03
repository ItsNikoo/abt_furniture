import { Search, Ruler, FileText, Hammer, Truck, CheckCircle, Phone, Monitor, MapPin, Palette, Calculator, FileCheck, Package, Users, Star } from "lucide-react";
import Link from "next/link"
import {ReactNode} from "react"

const steps = [
	{
		id: 1,
		title: "Выбор мебели",
		icon: Search,
		description:
			"Начните с подбора идеального варианта — у нас есть несколько удобных способов:",
		details: [
			{
				icon: Monitor,
				text: "Онлайн-каталог – изучите коллекции на сайте, фильтруйте по стилю, материалу",
			},
			{
				icon: Palette,
				text: "Индивидуальный проект – закажите уникальный дизайн у наших специалистов",
			},
			{
				icon: MapPin,
				text: "Личное присутствие – посетите наш салон, чтобы увидеть мебель вживую",
			},
		],
		note: "Абсолютно любой проект на нашем сайте можно переделать под себя. Просто свяжитесь с нами, и мы поможем адаптировать его под ваши нужды.",
	},
	{
		id: 2,
		title: "Замер и дизайн-проект",
		icon: Ruler,
		description: "Хотите мебель по индивидуальным параметрам? Мы предложим:",
		details: [
			{
				icon: Users,
				text: "Выезд замерщика – специалист приедет и точно снимет размеры",
			},
			{
				icon: Monitor,
				text: "3D-визуализация – получите проект с вашей мебелью в интерьере",
			},
			{
				icon: FileCheck,
				text: "Корректировки – внесем изменения до идеального результата",
			},
		],
	},
	{
		id: 3,
		title: "Оформление заказа",
		icon: FileText,
		description: "Прозрачное и честное оформление заказа:",
		details: [
			{
				icon: Calculator,
				text: "Расчет стоимости – прозрачная смета без скрытых платежей",
			},
			{
				icon: Palette,
				text: "Выбор материалов – подберем материал, фурнитуру и цвет под ваш стиль",
			},
			{
				icon: FileCheck,
				text: "Заключение договора – фиксируем сроки, гарантии и условия оплаты",
			},
		],
	},
	{
		id: 4,
		title: "Производство",
		icon: Hammer,
		description:
			"Ваша мебель изготавливается с контролем качества на каждом этапе:",
		details: [
			{
				icon: CheckCircle,
				text: "Используем экологичные и долговечные материалы",
			},
			{
				icon: Package,
				text: "Соблюдаем согласованные сроки изготовления",
			},
			{
				icon: Phone,
				text: "Информируем о готовности заказа",
			},
		],
	},
	{
		id: 5,
		title: "Доставка и сборка",
		icon: Truck,
		description: "Завершающий этап – доставляем и собираем:",
		details: [
			{
				icon: Truck,
				text: "Бережная доставка – привезем мебель в удобное время",
			},
			{
				icon: Users,
				text: "Профессиональная сборка – мастера быстро и точно соберут мебель",
			},
			{
				icon: CheckCircle,
				text: "Проверка качества – убедитесь, что всё идеально",
			},
		],
	},
];

export default function Howto() : ReactNode {
	return (
		<div className="relative mt-[10px] px-4 md:px-[50px] lg:px-[100px] py-[30px] flex flex-col gap-6 min-h-[80vh] z-[1] bg-white">
			{/* Header */}
			<div className="mb-8 sm:mb-12">
				<h1 className="text-mainPurple font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
					Как совершить заказ
				</h1>
				<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
					Простой и понятный процесс заказа мебели от выбора до установки. Мы
					сопровождаем вас на каждом этапе для получения идеального результата.
				</p>
			</div>

			{/* Steps */}
			<div className="space-y-6 sm:space-y-8">
				{steps.map((step, index) => {
					const IconComponent = step.icon;
					return (
						<div key={step.id} className="relative">
							{/* Connecting line */}
							{index < steps.length - 1 && (
								<div className="hidden sm:block absolute left-6 lg:left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-mainPurple to-mainPurple/30 z-10" />
							)}

							<div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
								<div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
									{/* Step number and icon */}
									<div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
										<div className="relative">
											<div className="bg-mainPurple text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-lg">
												<IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
											</div>
											<div className="absolute -top-2 -right-2 bg-white text-mainPurple rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold shadow-md">
												{step.id}
											</div>
										</div>
									</div>

									{/* Content */}
									<div className="flex-1">
										<h3 className="text-mainPurple font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">
											{step.title}
										</h3>
										<p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
											{step.description}
										</p>

										{/* Details list */}
										<div className="space-y-3 sm:space-y-4">
											{step.details.map((detail, detailIndex) => {
												const DetailIcon = detail.icon;
												return (
													<div
														key={detailIndex}
														className="flex items-start gap-3"
													>
														<div className="bg-mainPurple/10 rounded-full p-1.5 sm:p-2 flex-shrink-0 mt-0.5">
															<DetailIcon className="w-3 h-3 sm:w-4 sm:h-4 text-mainPurple" />
														</div>
														<p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
															{detail.text}
														</p>
													</div>
												);
											})}
										</div>

										{/* Note */}
										{step.note && (
											<div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-mainPurple/5 rounded-lg border-l-4 border-mainPurple">
												<p className="text-xs sm:text-sm lg:text-base text-mainPurple font-medium">
													💡 {step.note}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Final CTA section */}
			<div className="mt-8 sm:mt-12 text-center">
				<div className="bg-gradient-to-r from-mainPurple to-mainPurple/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
					<div className="flex justify-center mb-4 sm:mb-6">
						<div className="bg-white/20 rounded-full p-3 sm:p-4">
							<Star className="w-8 h-8 sm:w-10 sm:h-10" />
						</div>
					</div>
					<h3 className="font-bold font-overpass text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
						Готово! Наслаждайтесь новой мебелью
					</h3>
					<p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
						Мы даем гарантию на всю продукцию и готовы помочь с дополнительными
						вопросами. Хотите преобразить свой интерьер?
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
	);
}