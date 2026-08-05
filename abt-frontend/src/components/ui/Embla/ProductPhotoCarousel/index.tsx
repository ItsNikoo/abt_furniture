'use client'

import {useState} from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import {Photo} from '@/types/types'
import BasePhotoCarousel from "@/components/shared/BasePhotoCarousel"

export default function ProductPhotoCarousel({photos}: {photos: Photo[]}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSlideClick = (photoUrl: string) => {
    setPreviewUrl(photoUrl)
  }

  return (
    <>
      <BasePhotoCarousel
        photos={photos}
        showThumbnails={true} // Включаем миниатюры
        onSlideClick={handleSlideClick}
        imageClassName="object-contain" // Как в оригинале
        aspectRatio="aspect-video" // Для слайдов
      />

      {/* Модальное превью (как в оригинале) */}
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
    </>
  )
}