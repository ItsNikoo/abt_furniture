import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function FirstMainContainer() {
  return (
    <div className="relative flex items-center justify-center py-32 md:py-40 w-full">
      <div className="z-10 text-center max-w-3xl px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Производитель корпусной мебели в Москве
        </h1>
        <div>
          <p className="text-base md:text-xl mt-3">
            Мы не просто производим мебель — мы создаем уютные пространства, в которых хочется жить.
          </p>
        </div>
        <div className="mt-6">
          <Link href="/catalog">
            <Button className="rounded-full text-base font-extrabold p-5 md:p-7">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
