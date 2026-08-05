'use client'

import {Photo} from '@/types/types'
import BasePhotoCarousel from "@/components/shared/BasePhotoCarousel"

type PhotoCarouselProps = {
  photos: Photo[]
  className?: string
  imageClassName?: string
  slideClassName?: string
  aspectRatio?: string
  showDots?: boolean
}

export default function PhotoCarousel({
                                        photos,
                                        className,
                                        imageClassName,
                                        slideClassName = 'bg-gray-50',
                                        aspectRatio = 'aspect-video',
                                        showDots = true,
                                      }: PhotoCarouselProps) {
  return (
    <BasePhotoCarousel
      photos={photos}
      className={`${aspectRatio} ${className || ''}`}
      showDots={showDots}
      slideClassName={slideClassName}
      aspectRatio={aspectRatio}
      imageClassName={imageClassName}
    />
  )
}
