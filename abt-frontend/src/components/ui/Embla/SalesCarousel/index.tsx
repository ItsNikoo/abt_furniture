'use client'

import Image from 'next/image';
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Sale } from "@/types";
import Link from "next/link";

export default function SalesCarousel({ slides }: { slides: Sale[] }) {
  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay(autoplayOptions)]
  );

  // Состояние для текущего активного слайда
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Обновляем selectedIndex при смене слайда
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect(); // начальное значение
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Если нет слайдов — ничего не рендерим
  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full min-h-[50vh] md:min-h-[60vh] mt-3 overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <Link
              key={slide.id} // ← лучше использовать id, если есть
              className="embla__slide flex-none w-full relative min-h-[50vh] md:min-h-[60vh]"
              href={slide.link}
              target="_blank"
            >
              {/* Мобильная версия */}
              {slide.mobilePhoto && (
                <Image
                  src={slide.mobilePhoto}
                  alt={slide.description || 'Акция'}
                  fill
                  className="object-cover md:hidden"
                  priority={index === 0}
                  sizes="100vw"
                />
              )}

              {/* Десктопная версия */}
              {slide.photo && (
                <Image
                  src={slide.photo}
                  alt={slide.description || 'Акция'}
                  fill
                  className="object-cover hidden md:block"
                  priority={index === 0}
                  sizes="100vw"
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Точки навигации с активной */}
      {slides.length > 1 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-10 p-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`
                transition-all duration-300 rounded-full
                ${selectedIndex === index
                ? 'w-5 h-2 bg-mainPurple shadow-lg' 
                : 'w-2 h-2 bg-white hover:bg-white/90'
              }
              `}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Стрелки навигации */}
      {slides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white text-2xl transition backdrop-blur-sm"
            aria-label="Предыдущий слайд"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white text-2xl transition backdrop-blur-sm"
            aria-label="Следующий слайд"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}