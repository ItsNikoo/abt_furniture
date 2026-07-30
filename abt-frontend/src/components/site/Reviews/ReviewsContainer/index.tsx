import {fetchReviews} from "@/lib/api/reviews"
import ReviewsCarousel from "@/components/site/Reviews/ReviewsCarousel"
import {Review} from "@/types"


export default async function ReviewsContainer() {
  let reviews: Review[] = []

  try {
    reviews = await fetchReviews()
  } catch (error) {
    console.error('Failed to load reviews:', error)
    return null
  }

  if (reviews.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-200 py-12 mt-10">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Узнайте, что говорят о нас довольные покупатели. Мы гордимся качеством нашей мебели!
        </p>
      </div>
      <ReviewsCarousel reviews={reviews}/>
    </div>
  )
}
