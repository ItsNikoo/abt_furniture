'use client'

import {motion} from "framer-motion"
import {Review} from "@/types"
import {Star} from "lucide-react"
import {fadeInView} from '@/lib/animations'
import PhotoWithPreview from "@/components/shared/PhotoWithPreview"

interface ReviewProps {
  review: Review;
}

interface ReviewPageProps {
  reviews: Review[];
}

function ReviewCard({review}: ReviewProps) {
  return (
    <motion.div
      {...fadeInView}
      className="bg-white p-4 sm:p-6 border border-gray-100 rounded-lg shadow-sm max-w-4xl mx-auto w-full">
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

      <div className="py-4 border-t border-gray-100">
        <div className="font-semibold text-gray-900">{review.name}</div>
        <div className="text-sm text-gray-500">{review.location}</div>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4 break-words">{review.review}</p>

      {review.photos && review.photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {review.photos.map((photo) => (
            <PhotoWithPreview
              key={photo.id}
              photoUrl={photo.photoUrl}
              photoAlt={`Фото отзыва ${review.id}`}
              fill
              className="w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function ReviewsClientPage({reviews}: ReviewPageProps) {
  return (
    <div className="py-8 md:py-12 lg:py-16">
      <motion.div
        {...fadeInView}
        className="mb-8 md:mb-12 max-w-4xl mx-auto">
        <h1 className="text-gray-950 font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
          Отзывы
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          Реальные мнения и отзывы от тех, кто уже выбрал нашу мебель для своего дома. Убедитесь в качестве на
          примерах реальных проектов.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review}/>
        ))}
      </div>
    </div>
  )
}