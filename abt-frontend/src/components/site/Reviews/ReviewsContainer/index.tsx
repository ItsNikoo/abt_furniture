import {fetchReviews} from "@/lib/api/reviews";
import ReviewsCarousel from "@/components/site/Reviews/ReviewsCarousel";


export default async function ReviewsContainer() {
  const reviews = await fetchReviews()

  return (
    <div className="bg-gray-200 py-12 mt-10">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Узнайте, что говорят о нас довольные покупатели. Мы гордимся качеством нашей мебели!
        </p>
      </div>
      {/*<ReviewsCarousel reviews={reviews}/>*/}
      <ReviewsCarousel reviews={reviews} />
    </div>
  )
}
