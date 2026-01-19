import Image from "next/image"
import {ContactForm} from "@/components/ui/ContactForm";

export default function FeedbackForm() {
  return (
    <div className="relative bg-orange-400 h-[750px] overflow-hidden">
      <Image
        src="/modern_kitchen.jpeg"
        alt="Modern kitchen"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex items-center justify-center lg:justify-start px-6 lg:px-16">
        <div className="h-full flex flex-col justify-center max-w-md w-full">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3 leading-tight">
              Поможем создать <span className="underline">вашу уютную мебель</span>
            </h2>
            <p className="text-white/90 text-sm lg:text-base">
              Ответим на все вопросы и подготовим предложение
            </p>
          </div>

          <div className="w-full bg-white/95 backdrop-blur rounded-xl p-6 lg:p-8">
            <ContactForm
              title="Получить расчет"
              submitText="Получить расчет"
            />
          </div>
        </div>
      </div>
    </div>
  )
}