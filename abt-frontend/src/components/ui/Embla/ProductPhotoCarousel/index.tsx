'use client'

import { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/ui/button'
import { Photo } from '@/types'

export default function ProductPhotoCarousel({ photos }: { photos: Photo[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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
    <div className={`relative w-full max-w-4xl mx-auto group overflow-hidden`}>
      {/* Карусель */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {photos.map((photo) => (
            <div key={photo.id} className="flex-[0_0_100%] min-w-0"
                 onClick={() => setPreviewUrl(photo.photoUrl)}>
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

      {/*/!* Индикаторы *!/*/}
      {/*<div className="flex justify-center gap-1 mt-4">*/}
      {/*    /!*{photos.map((_, index) => (*!/*/}
      {/*    /!*    <button*!/*/}
      {/*    /!*        key={index}*!/*/}
      {/*    /!*        onClick={(e) => scrollTo(index, e)}*!/*/}
      {/*    /!*        className={`w-2 h-2 rounded-full transition-colors ${*!/*/}
      {/*    /!*            index === selectedIndex ? 'bg-mainPurple' : 'bg-gray-300'*!/*/}
      {/*    /!*        }`}*!/*/}
      {/*    /!*        aria-label={`Перейти к слайду ${index + 1}`}*!/*/}
      {/*    /!*    />*!/*/}
      {/*    /!*))}*!/*/}
      {/*    {photos.map((photo: Photo) => (*/}
      {/*        <Image key={photo.id} src={photo.photoUrl} alt={`Фото ${photo.id}`} fill />*/}
      {/*    ))}*/}
      {/*</div>*/}

      {/* Миниатюры */}
      <div className="flex gap-2 mt-4 overflow-x-auto px-2">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={(e) => scrollTo(index, e)}
            className={`relative w-20 h-14 rounded overflow-hidden border-2 transition-all ${
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

      {/* Превью в модалке через portal */}
      {previewUrl && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="relative w-full max-w-6xl aspect-video">
            <Image
              src={previewUrl}
              alt="Превью"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
