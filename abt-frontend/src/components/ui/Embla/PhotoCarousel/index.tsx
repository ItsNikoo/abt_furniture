'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Photo } from '@/types'

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Останавливаем всплытие
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Останавливаем всплытие
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation() // Останавливаем всплытие
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)

    // Установим индекс при монтировании
    setSelectedIndex(emblaApi.selectedScrollSnap())

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className={`relative w-full max-w-4xl mx-auto group overflow-hidden aspect-video`}>
      {/* Карусель */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {photos.map((photo) => (
            <div key={photo.id} className="flex-[0_0_100%] min-w-0">
              <div className={`relative aspect-video h-fit`}>
                <Image
                  src={photo.photoUrl}
                  alt={`Фото ${photo.id}`}
                  className="object-center"
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Навигационные кнопки */}
      <Button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={scrollPrev}
        aria-label="Предыдущий"
      >
        <Image src="/arrow-left.svg" alt="Назад" width={24} height={24}/>
      </Button>
      <Button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={scrollNext}
        aria-label="Следующий"
      >
        <Image src="/arrow-right.svg" alt="Вперёд" width={24} height={24}/>
      </Button>

      {/* Индикаторы */}
      <div className="flex justify-center gap-1 mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={(e) => scrollTo(index, e)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-mainPurple' : 'bg-gray-300'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
