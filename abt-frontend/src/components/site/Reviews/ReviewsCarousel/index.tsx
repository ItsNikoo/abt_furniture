'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {Review} from "@/types"
import ReviewSlide from "@/components/site/Reviews/ReviewSlide"

interface ReviewsCarouselProps {
  reviews: Review[]
}

export default function ReviewsCarousel({reviews}: ReviewsCarouselProps) {
  // Дублируем слайды для бесконечной прокрутки
  const extendedReviews = [...reviews, ...reviews, ...reviews]

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: false,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 }
    }
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {extendedReviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_calc(51%-1rem)] lg:flex-[0_0_calc(34.333%-1rem)]"
                >
                  <ReviewSlide review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - используем canScrollPrev/canScrollNext для disabled */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10
                       bg-white hover:bg-gray-50 rounded-full p-2 md:p-3
                       shadow-lg transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={scrollPrev}
            disabled={!canScrollPrev} 
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10
                       bg-white hover:bg-gray-50 rounded-full p-2 md:p-3
                       shadow-lg transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  )
}