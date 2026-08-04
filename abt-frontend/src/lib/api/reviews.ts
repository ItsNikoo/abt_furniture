import {Review, ReviewData} from "@/types"
import {apiGet, apiRequest} from "@/lib/utils/apiRequest"

export async function fetchReviews(): Promise<Review[]> {
  return apiGet<Review[]>(`/reviews/`, {fallback: []})
}

export async function postReview(data: ReviewData, token: string): Promise<Review> {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('review', data.review)
  formData.append('rank', data.rank.toString())
  formData.append('date', data.date)
  formData.append('location', data.location)

  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append('photoFiles', file)
    })
  }
  return apiRequest(
    `/reviews/`,
    {
      method: "POST",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function patchReview(id: number, data: ReviewData, token: string): Promise<Review> {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('review', data.review)
  formData.append('rank', data.rank.toString())
  formData.append('date', data.date)
  formData.append('location', data.location)

  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append('photoFiles', file)
    })
  }

  if (data.deletePhotos && data.deletePhotos.length > 0) {
    data.deletePhotos.forEach((url) => {
      formData.append('deletePhotos', url)
    })
  }
  return apiRequest(
    `/reviews/${id}/`,
    {
      method: "PATCH",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function deleteReview(id: number, token: string) {
  return apiRequest(
    `/reviews/${id}/`,
    {
      method: "DELETE",
      token: token
    }
  )
}
