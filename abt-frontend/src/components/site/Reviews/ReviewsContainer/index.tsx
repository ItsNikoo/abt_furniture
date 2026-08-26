import {fetchReviews} from "@/lib/api/reviews"
import ReviewsCarousel from "@/components/site/Reviews/ReviewsCarousel"
import {Review} from "@/types/types"


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
    <div className="bg-gray-200 py-6 my-2">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h2>
        <p className="text-md text-gray-600 max-w-2xl mx-auto px-4">
          Реальные мнения и отзывы от тех, кто уже выбрал нашу мебель для своего дома. Убедитесь в качестве на примерах реальных проектов. Больше отзывов{' '}
          <a
            href="https://yandex.com/maps/org/kukhni_abt/170232015961/reviews/?display-text=%D0%BA%D1%83%D1%85%D0%BD%D0%B8%20%D0%B0%D0%B1%D1%82&ll=37.968324%2C55.739950&mode=search&sctx=ZAAAAAgBEAAaKAoSCfFmDd5XtSVAEXmxMEROl0hAEhIJAAAAAAA3VEARj6flB66uQUAiBgABAgMEBSgKOABAkE5IAWoCcnWdAc3MzD2gAQCoAQC9AQEIDO%2FCAQbZ2PmU%2BgSCAhHQutGD0YXQvdC4INCw0LHRgooCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=37.972444%2C55.739950&sspn=0.019741%2C0.007396&tab=reviews&text=%D0%BA%D1%83%D1%85%D0%BD%D0%B8%20%D0%B0%D0%B1%D1%82&z=16"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-mainPurple underline underline-offset-2 transition-colors hover:text-mainPurpleHovered"
          >
            на картах
          </a>.
        </p>
      </div>
      <ReviewsCarousel reviews={reviews}/>
    </div>
  )
}
