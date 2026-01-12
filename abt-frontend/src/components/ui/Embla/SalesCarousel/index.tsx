'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import { Sale } from '@/types'
import Link from 'next/link'

export default function SalesCarousel({ slides }: { slides: Sale[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!slides?.length) return null

  return (
    <section className="w-full overflow-hidden">
      <div ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <Link
              key={slide.id}
              href={slide.link}
              target="_blank"
              className="min-w-full"
            >
              <div className="w-full flex justify-center">
                {/* Mobile */}
                {slide.mobilePhoto && (
                  <Image
                    src={slide.mobilePhoto}
                    alt={slide.description || 'Акция'}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain md:hidden"
                    priority={index === 0}
                  />
                )}

                {/* Desktop */}
                {slide.photo && (
                  <Image
                    src={slide.photo}
                    alt={slide.description || 'Акция'}
                    width={1920}
                    height={800}
                    className="w-full h-auto object-contain hidden md:block"
                    priority={index === 0}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Точки */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all rounded-full ${
                selectedIndex === index
                  ? 'w-5 h-2 bg-mainPurple'
                  : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Стрелки */}
      {slides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full bg-black/30 hover:bg-black/50
              flex items-center justify-center text-white text-2xl"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full bg-black/30 hover:bg-black/50
              flex items-center justify-center text-white text-2xl"
          >
            ›
          </button>
        </>
      )}
    </section>
  )
}
