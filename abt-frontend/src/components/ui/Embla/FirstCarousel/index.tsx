'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sale } from '@/types'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {motion} from 'framer-motion'

export default function FirstCarousel({ slides }: { slides: Sale[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]) // Луп и автопрокрутка
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Функции для навигации
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  // Обновление текущего индекса
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]">
      {/* Контейнер для карусели */}
      <div className="embla">
        <div className="embla__viewport overflow-hidden my-3 sm:my-5 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl" ref={emblaRef}>
          <div className="embla__container flex">
            {slides && slides.map((slide) => (
              <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 ">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 flex flex-col items-center justify-between pt-3 sm:pt-5 pb-5 sm:pb-10 px-2 sm:px-3">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-overpass font-extrabold text-center">{slide.title}</h1>
                    <div className="flex flex-col items-center mt-4 sm:mt-0">
                      <Link
                        href={slide.link}
                        className="rounded-full bg-mainPurple p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-mainPurpleHovered"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                          src="/star.svg"
                          alt="Star icon"
                          width={24}
                          height={24}
                          className="sm:w-8 sm:h-8 object-contain"
                        />
                      </Link>
                      <p className="mt-2 text-sm sm:text-base text-gray-400 text-center px-2">{slide.description}</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-gray-400">
                    <Link href={slide.link}
                          target="_blank"
                          rel="noopener noreferrer">
                      {slide.photo &&
                       <Image
                         src={slide.photo}
                         alt={slide.description}
                         width={1200}
                         height={1200}
                         className="rounded-lg object-cover w-full h-full"
                       />}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Точки навигации */}
        <div className="mt-2 sm:mt-4 flex justify-center gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === selectedIndex ? 'bg-mainPurple' : 'bg-gray-300'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Кнопки навигации вне контейнера embla - скрываем на мобильных */}
      <Button
        className="hidden sm:flex absolute left-[-30px] lg:left-[-50px] top-1/2 -translate-y-1/2 bg-mainPurple p-2 w-8 h-8 lg:w-10 lg:h-10 hover:bg-mainPurpleHovered transition-colors duration-200 items-center justify-center shadow-lg"
        onClick={scrollPrev}
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </Button>
      <Button
        className="hidden sm:flex absolute right-[-30px] lg:right-[-50px] top-1/2 -translate-y-1/2 bg-mainPurple p-2 w-8 h-8 lg:w-10 lg:h-10 hover:bg-mainPurpleHovered transition-colors duration-200 items-center justify-center shadow-lg"
        onClick={scrollNext}
        aria-label="Следующий слайд"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </Button>
    </motion.div>
  )
}
