'use client'

import Image from 'next/image'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Review} from '@/types/types'
import {Button} from "@/components/ui/button"
import Cookies from "js-cookie"
import {useState} from "react"
import {deleteReviewAction} from "@/actions/reviews"
import UpdateReviewContainer from "@/components/admin/reviews/UpdateReviewContainer"

interface Props {
  review: Review,
}

export default function ReviewCard({review}: Props) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  const mainPhoto = review.photos && review.photos.length > 0
    ? review.photos[0].photoUrl
    : null

  const thumbnailPhotos = review.photos?.slice(1) || []

  async function handleDelete() {
    const token = Cookies.get('token')
    if (token) {
      await deleteReviewAction(review.id, token) // Assuming this action exists
    } else {
      console.error('Токен не найден. Пожалуйста, войдите в систему.')
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          {mainPhoto ? (
            <Image
              src={mainPhoto}
              alt={review.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-gray-400 text-sm">Нет изображения</span>
            </div>
          )}
        </div>

        <CardHeader className="pb-3 flex-row justify-between">
          <div className="flex flex-col">
            <CardTitle className="line-clamp-2 text-lg leading-tight">
              {review.name}
            </CardTitle>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < review.rank ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-primary">
                {review.rank}/5
              </p>
            </div>

            {review.location && (
              <p className="text-sm text-muted-foreground mt-2">
                {review.location}
              </p>
            )}
            {review.date && (
              <p className="text-sm text-muted-foreground mt-1">
                {review.date}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowUpdateDialog(true)}>Изменить</Button>
            <Button onClick={handleDelete} variant="destructive">Удалить</Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Текст отзыва */}
          <p className="text-sm leading-relaxed text-gray-800">
            {review.review}
          </p>

          {/* Превью дополнительных фото */}
          {thumbnailPhotos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
              {thumbnailPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <Image
                    src={photo.photoUrl}
                    alt={`Доп. фото ${index + 2}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {review.photos && review.photos.length > 1 && (
            <p className="text-xs text-muted-foreground">
              Всего фото: {review.photos.length}
            </p>
          )}
        </CardContent>
      </Card>

      {showUpdateDialog && (
        <UpdateReviewContainer
          review={review}
          isOpen={showUpdateDialog}
          onCloseAction={() => setShowUpdateDialog(false)}
        />
      )}
    </>
  )
}