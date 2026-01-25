'use client'

import {motion} from "framer-motion"
import {useState, useCallback, useEffect} from "react"
import ReactDOM from 'react-dom' // Добавил для портала
import {Review} from "@/types"
import {Star, X} from "lucide-react"
import Image from "next/image"

interface ReviewProps {
  review: Review;
  index: number;
  onImageClick?: (imageUrl: string) => void; // Callback для открытия модала (как в ProductPhotoCarousel)
}

interface ReviewPageProps {
  reviews: Review[];
}

function ReviewCard({review, index, onImageClick}: ReviewProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: index * 0.1}}
      className="bg-white p-6 border max-w-4xl mx-auto w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={`${
                i < review.rank
                  ? 'text-mainPurple fill-mainPurple'
                  : 'text-gray-300 fill-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>

      {/* Имя и локация */}
      <div className="py-4 border-t border-gray-100">
        <div className="font-semibold text-gray-900">{review.name}</div>
        <div className="text-sm text-gray-500">{review.location}</div>
      </div>

      {/* Текст отзыва */}
      <p className="text-gray-700 leading-relaxed mb-4 break-words">{review.review}</p>

      {/* Фото (если есть) — интегрировано с существующей логикой модала */}
      {review.photos && review.photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {review.photos.map((photo) => (
            <div
              key={photo.id}
              className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onImageClick?.(photo.photoUrl)} // Вызов callback, как handleSlideClick
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onImageClick?.(photo.photoUrl)}
              aria-label={`Открыть фото отзыва в полном размере`}
            >
              <Image
                src={photo.photoUrl}
                alt={`Фото отзыва ${review.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Модальное превью (адаптировано из ProductPhotoCarousel с добавлением кнопки закрытия и анимации)
function ImagePreviewModal({previewUrl, onClose}: {previewUrl: string; onClose: () => void}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl aspect-video p-4"> {/* Добавил padding для кнопки */}
        {/* Кнопка закрытия (опционально, если нужно; в оригинале нет, но полезно) */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Закрыть превью"
        >
          <X size={24} className="text-gray-800" />
        </button>

        <Image
          src={previewUrl}
          alt="Превью фото отзыва"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}

export default function ReviewsClientPage({reviews}: ReviewPageProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null) // Состояние как в ProductPhotoCarousel

  const handleImageClick = useCallback((imageUrl: string) => {
    setPreviewUrl(imageUrl)
  }, [])

  const closePreview = useCallback(() => {
    setPreviewUrl(null)
  }, [])

  return (
    <div className="my-5 px-4">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="mb-8 sm:mb-12 max-w-4xl mx-auto">
        <h1 className="text-mainPurple font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
          Отзывы
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          Реальные мнения и отзывы от тех, кто уже выбрал нашу мебель для своего дома. Убедитесь в качестве на примерах
          реальных проектов.
        </p>
      </motion.div>

      {/* Колонка с отзывами */}
      <div className="flex flex-col gap-6">
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            index={index}
            onImageClick={handleImageClick}
          />
        ))}
      </div>

      {previewUrl && typeof document !== 'undefined' && ReactDOM.createPortal(
        <ImagePreviewModal previewUrl={previewUrl} onClose={closePreview} />,
        document.body
      )}
    </div>
  )
}