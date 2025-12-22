'use client'
import {ChevronLeft, ChevronRight} from "lucide-react"
import {useEffect, useRef, useState} from "react"
import {Sale} from "@/types"
import Link from "next/link"
import Image from "next/image"

export default function FirstCarousel({slides}: { slides: Sale[] }) {
  const [current, setCurrent] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function previous() {
    if (current === 0) {
      setCurrent(slides.length - 1)
    } else {
      setCurrent(current - 1)
    }
    resetTimeout()
  }

  function next() {
    if (current === slides.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  function goToSlide(index: number) {
    setCurrent(index)
  }

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // Автопрокрутка каждые 3 секунды
  useEffect(() => {
    if (!isPaused && slides.length > 1) {
      timeoutRef.current = setTimeout(() => {
        next()
      }, 5000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current, isPaused, slides.length])

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full mx-[15px] md:mx-[50px] lg:mx-[100px]
                      aspect-[16/6]  /* Фиксированное соотношение сторон 16:9 */
                      rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
        <div className="overflow-hidden relative w-full h-full"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}>
          <div className="flex h-full transition-transform ease-out duration-1000"
               style={{
                 transform: `translateX(-${current * 100}%`
               }}>
            {slides && slides.map((slide) => (
              <Link
                key={slide.id}
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-full h-full relative cursor-pointer"
              >
                {slide.photo ? (
                  <Image
                    src={slide.photo}
                    alt={slide.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-lg">Загрузка...</div>
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div className="absolute inset-0 flex justify-between items-center p-4 pointer-events-none">
            <button
              onClick={previous}
              className="p-1 rounded-full shadow bg-white/80 hover:bg-white cursor-pointer pointer-events-auto z-10"
            >
              <ChevronLeft/>
            </button>
            <button
              onClick={next}
              className="p-1 rounded-full shadow bg-white/80 hover:bg-white cursor-pointer pointer-events-auto z-10"
            >
              <ChevronRight/>
            </button>
          </div>
          <div className={`absolute bottom-4 right-0 left-0`}>
            <div className={`flex items-center justify-center gap-1`}>
              {slides.map((_, index: number) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all w-6 h-1 rounded-full cursor-pointer ${current === index ? "bg-mainPurple" : "bg-white"}`}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}