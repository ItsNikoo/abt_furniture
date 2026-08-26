import {Button} from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function KitchenMainContainer() {
  return (
    <div className="relative flex flex-col w-full items-center justify-center overflow-hidden xl:min-h-[calc(100vh-120px)]">
      {/* Фоновое изображение */}
      <Image
        src="/kitchen-hero.jpg"
        alt="Кухня на заказ"
        fill
        priority
        className="object-cover"
      />

      {/* Затемняющий оверлей для читаемости текста */}
      <div className="absolute inset-0 bg-black/50"/>

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-[1280px] px-2 py-12 md:gap-4 gap-2">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight text-white text-center">
          Кухни на заказ напрямую от производителя в Москве и МО
        </h1>
        <div>
          <p className="text-base lg:text-lg md:mt-3 text-white/90 text-center">
            Создадим кухню любых цветов и размеров! Множество материалов на выбор.
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="text-base font-extrabold p-5 md:p-7">
            <Link href="#calculation">
              Рассчитать стоимость
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}