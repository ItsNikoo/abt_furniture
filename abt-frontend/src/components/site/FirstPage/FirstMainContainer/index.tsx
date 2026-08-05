import {Button} from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function FirstMainContainer() {
  return (
    <div className="relative grid w-full items-center py-20 md:py-24 xl:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] xl:py-0">
      <div className="z-10 max-w-3xl">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight opacity-85">
          Корпусная мебель на заказ напрямую от производителя
        </h1>
        <div>
          <p className="text-base lg:text-lg mt-3 opacity-80">
            Рассчитаем стоимость мебели под ваши нужды и размеры!
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="text-base font-extrabold p-5 md:p-7">
            <Link href="#calculation">
              Рассчитать стоимость
            </Link>
          </Button>
          <Button asChild className="text-base font-extrabold p-5 md:p-7" variant="outline">
            <Link href="/catalog">
              Перейти в каталог
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative hidden h-full overflow-hidden rounded-lg xl:block xl:-ml-20 xl:w-[calc(100%+5rem)]">
        <Image
          src="/first-page-content.png"
          alt="Корпусная мебель на заказ"
          fill
          sizes="(min-width: 1280px) 45vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
