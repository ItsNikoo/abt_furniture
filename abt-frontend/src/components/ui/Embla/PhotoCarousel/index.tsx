'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Photo } from '@/types';

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);

        // Установим индекс при монтировании
        setSelectedIndex(emblaApi.selectedScrollSnap());

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="w-full max-w-4xl mx-auto relative">
            {/* Стрелки вне слайда */}
            <Button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10"
                onClick={scrollPrev}
                aria-label="Предыдущий"
            >
                <Image src="/arrow-left.svg" alt="Назад" width={24} height={24} />
            </Button>
            <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-10 h-10"
                onClick={scrollNext}
                aria-label="Следующий"
            >
                <Image src="/arrow-right.svg" alt="Вперёд" width={24} height={24} />
            </Button>

            {/* Карусель */}
            <div className="embla__viewport overflow-hidden  shadow-lg" ref={emblaRef}>
                <div className="embla__container flex">
                    {photos.map((photo: Photo, index: number) => (
                        <div
                            key={photo.id}
                            className="embla__slide flex-[0_0_100%] relative h-[450px]"
                        >
                            <Image
                                src={photo.photo_url}
                                alt={`Фото ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Точки-индикаторы */}
            <div className="mt-4 flex justify-center gap-1">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === selectedIndex ? 'bg-mainPurple' : 'bg-gray-300'
                        }`}
                        aria-label={`Слайд ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
