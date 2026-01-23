import SiteContainer from "@/components/SiteContainer";
import ReviewsClientPage from "@/components/site/Reviews/ReviewsClientPage";
import {fetchReviews} from "@/lib/api/reviews";

export default async function ReviewsPage(){
  const reviews = await fetchReviews()

  return(
    <SiteContainer>
      <ReviewsClientPage reviews={reviews} />
    </SiteContainer>
  )
}