import {Review} from "@/types/types"
import {use} from "react"
import ReviewCard from "@/components/admin/reviews/ReviewCard"

interface ReviewsGridProps {
  reviewsPromise: Promise<Review[]>
}

export default function ReviewsGrid({reviewsPromise}: ReviewsGridProps) {
  const reviews = use(reviewsPromise)

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        {reviews?.map((review: Review) => (
          <div key={review.id} className="mt-3">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}