'use client'

import {useCallback, useEffect, useState} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {Photo} from '@/types'

interface BasePhotoCarouselProps {
  photos: Photo[]
  className?: string
  slideClassName?: string // Для кастомизации слайдов
  showDots?: boolean // Показывать dots-индикаторы
  showThumbnails?: boolean // Показывать миниатюры
  onSlideClick?: (photoUrl: string) => void // Callback для клика на слайд
  thumbnailsClassName?: string // Классы для миниатюр
  imageClassName?: string // Классы для Image в слайдах
  aspectRatio?: string // Aspect-ratio для слайдов (default: 'aspect-video')
}

export default function BasePhotoCarousel(
  {
    photos,
    className = '',
    slideClassName = '',
    showDots = false,
    showThumbnails = false,
    onSlideClick,
    thumbnailsClassName = '',
    imageClassName = 'object-contain',
    aspectRatio = 'aspect-video'
  }: BasePhotoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    setSelectedIndex(emblaApi.selectedScrollSnap())

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const handleSlideClick = (photo: Photo) => {
    onSlideClick?.(photo.photoUrl)
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto group overflow-hidden ${className}`}>
      {/* Карусель */}
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`flex-[0_0_100%] min-w-0 h-full ${slideClassName}`}
              onClick={() => handleSlideClick(photo)}
            >
              <div className={`relative ${aspectRatio} ${showThumbnails ? '' : 'bg-gray-50'}`}>
                <Image
                  src={photo.photoUrl}
                  alt={`Фото ${photo.id}`}
                  fill
                  className={imageClassName}
                  priority={showThumbnails} // Priority только для thumbnails-версии
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Навигационные кнопки */}
      <Button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-lg p-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={scrollPrev}
        aria-label="Предыдущий"
      >
        <Image src="/arrow-left.svg" alt="Назад" width={24} height={24}/>
      </Button>
      <Button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-lg p-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={scrollNext}
        aria-label="Следующий"
      >
        <Image src="/arrow-right.svg" alt="Вперёд" width={24} height={24}/>
      </Button>

      {/* Dots-индикаторы */}
      {showDots && (
        <div className="flex justify-center gap-1 mt-4">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => scrollTo(index, e)}
              className={`w-2 h-2 rounded-lg transition-colors ${
                index === selectedIndex ? 'bg-mainPurple' : 'bg-gray-300'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Миниатюры */}
      {showThumbnails && (
        <div className={`flex gap-2 mt-4 overflow-x-auto px-2 ${thumbnailsClassName}`}>
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={(e) => scrollTo(index, e)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex ? 'border-mainPurple' : 'border-transparent'
              }`}
            >
              <Image
                src={photo.photoUrl}
                alt={`Миниатюра ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
