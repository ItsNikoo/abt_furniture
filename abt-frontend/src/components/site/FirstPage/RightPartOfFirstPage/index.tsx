import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function RightPartOfFirstPage() {
  return (
    <div className="lg:w-1/2 w-full flex justify-center items-center">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-[360px]">
        {/* Decorative top element */}
        <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-mainPurple"></div>

        {/* Content */}
        <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-5 sm:pb-6">
          <p className="text-center mb-4 sm:mb-5 text-sm sm:text-base text-gray-700">
            Предложите нам идею, и мы поможем вам ее реализовать
          </p>

          <form className="flex flex-col gap-3 sm:gap-4" action="">
            <Input className="py-4 sm:py-[25px] text-sm sm:text-base" placeholder="Введите номер телефона" type="tel" />

            <Input className="py-4 sm:py-[25px] text-sm sm:text-base" placeholder="Комментарий или пожелания..." />

            <div className="space-y-2">
              <Label className="text-gray-500 text-xs sm:text-sm">Отправьте эскиз или фото</Label>
              <Input
                type="file"
                accept="image/*"
              />
            </div>

            <Button className="py-4 sm:py-[25px] text-sm sm:text-base font-semibold mt-2">Рассчитать стоимость</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
