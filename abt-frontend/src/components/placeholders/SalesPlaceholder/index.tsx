'use client'
import {ChevronLeft, ChevronRight} from "lucide-react"

export default function SalesPlaceholder() {
  return (
    <div className="flex justify-center items-center xl:px-[12vh]">
      <div className="w-full mx-[15px] md:mx-[50px] lg:mx-[100px]
                      aspect-[16/6]
                      rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl
                      animate-pulse">
        <div className="overflow-hidden relative w-full h-full">
          {/* Статичный плейсхолдер слайд */}
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center">
          </div>

          {/* Кнопки навигации (задизейблены) */}
          <div className="absolute inset-0 flex justify-between items-center p-4 pointer-events-none">
            <div className="p-1 rounded-full shadow bg-gray-300">
              <ChevronLeft className="text-gray-400"/>
            </div>
            <div className="p-1 rounded-full shadow bg-gray-300">
              <ChevronRight className="text-gray-400"/>
            </div>
          </div>

          {/* Индикаторы прогресса */}
          <div className={`absolute bottom-4 right-0 left-0`}>
            <div className={`flex items-center justify-center gap-1`}>
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-6 h-1 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}