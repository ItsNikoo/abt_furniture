import {fetchReviews} from "@/lib/api/reviews";
import ReviewsGrid from "@/components/admin/reviews/ReviewsGrid";
import {Review} from "@/types";
import {ADMIN_ROUTES} from "@/config/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function ReviewsPage(){
  const reviewsPromise: Promise<Review[]> = fetchReviews()
  return(
    <div>
      <h1 className="text-2xl font-bold mb-2">Отзывы</h1>
      <Link href={`${ADMIN_ROUTES.REVIEWS.path}/add`}>
        <Button>
          Добавить отзыв
        </Button>
      </Link>
      <ReviewsGrid reviewsPromise={reviewsPromise} />
    </div>
  )
}