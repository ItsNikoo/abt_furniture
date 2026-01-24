import { Review } from '@/types'
import {Star} from "lucide-react"
import Link from "next/link"
import {ROUTES} from "@/config/navigation"

interface ReviewSlideProps {
  review: Review
}

export default function ReviewSlide({ review }: ReviewSlideProps) {
  return (
    <Link href={ROUTES.REVIEWS.path}>
      <div className="bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Звезды */}
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

        {/* Дата */}
        <div className="text-sm text-gray-600 mb-4">
          {review.date}
        </div>

        {/* Текст отзыва с переносом и ограничением */}
        <div className="mb-6 flex-grow overflow-hidden">
          <p className="text-gray-800 text-sm leading-relaxed break-words whitespace-normal">
            {review.review}
          </p>
        </div>

        {/* Автор и город */}
        <div className="pt-4 border-t border-gray-100">
          <div className="font-semibold text-gray-900 truncate">
            {review.name}
          </div>
          <div className="text-sm text-gray-500 mt-1 truncate">
            {review.location}
          </div>
        </div>
      </div>
    </Link>
  )
}