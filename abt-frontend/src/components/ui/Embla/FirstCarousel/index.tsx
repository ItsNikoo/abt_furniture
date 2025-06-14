'use client';

import {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {Sale} from "@/types";
import Link from "next/link";


export default function FirstCarousel({slides}: { slides: Sale[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay({delay: 4000})]); // Луп и автопрокрутка
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Функции для навигации
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    // Обновление текущего индекса
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="relative mx-auto max-w-[80%]">
            {/* Контейнер для карусели */}
            <div className="embla">
                <div className="embla__viewport overflow-hidden my-5 rounded-xl shadow-xl" ref={emblaRef}>
                    <div className="embla__container flex">
                        {slides && slides.map((slide) => (
                            <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 ">
                                <div className="flex flex-row">
                                    <div className="w-1/2 flex flex-col items-center justify-between pt-5 pb-10 px-3">
                                        <h1 className="text-5xl font-orelega-one text-center">{slide.title}</h1>
                                        <div className='flex flex-col items-center'>
                                            <Link
                                                href={slide.link}
                                                className="rounded-full bg-mainPurple p-2 w-10 h-10 flex items-center justify-center hover:bg-mainPurpleHovered"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <Image
                                                    src="/star.svg"
                                                    alt="Star icon"
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </Link>
                                            <p className="mt-2 text-gray-400 font-montserrat">{slide.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-[550px] bg-gray-400">
                                        <Link href={slide.link}
                                              target="_blank"
                                              rel="noopener noreferrer">
                                            {slide.photo &&
                                                <Image
                                                    src={slide.photo}
                                                    alt={slide.description}
                                                    width={1200}
                                                    height={1200}
                                                    className="rounded-lg object-cover w-full h-full"
                                                />}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Точки навигации */}
                <div className="mt-4 flex justify-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`h-3 w-3 rounded-full ${
                                index === selectedIndex ? 'bg-mainPurple' : 'bg-gray-300'
                            }`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Кнопки навигации вне контейнера embla */}
            <Button
                className="absolute left-[-50px] top-1/2 -translate-y-1/2 bg-mainPurple p-2 w-10 h-10 hover:bg-mainPurpleHovered"
                onClick={scrollPrev}
                aria-label="Предыдущий слайд"
            >
                <Image
                    src="/arrow-left.svg"
                    alt="Назад"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </Button>
            <Button
                className="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-mainPurple p-2 w-10 h-10 hover:bg-mainPurpleHovered"
                onClick={scrollNext}
                aria-label="Следующий слайд"
            >
                <Image
                    src="/arrow-right.svg"
                    alt="Вперед"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </Button>
        </div>
    );
}