'use client'

import {Photo} from '@/types'
import BasePhotoCarousel from "@/components/shared/BasePhotoCarousel";

export default function PhotoCarousel({photos, className}: { photos: Photo[]; className?: string }) {
  return (
    <BasePhotoCarousel
      photos={photos}
      className={`aspect-video ${className || ''}`} // Добавляем aspect-video на корень
      showDots={true} // Включаем dots
      slideClassName="bg-gray-50" // Фон для слайдов, как в оригинале
    />
  )
}