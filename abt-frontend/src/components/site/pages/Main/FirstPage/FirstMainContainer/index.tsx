import {Button} from "@/components/ui/button"
import Link from "next/link"

export default function FirstMainContainer() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-[1280px] px-4 py-12 gap-4">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight opacity-85 text-center">
          Корпусная мебель на заказ напрямую от производителя
        </h1>
        <div>
          <p className="text-base lg:text-lg mt-3 opacity-80 text-center">
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
    </div>
  )
}
