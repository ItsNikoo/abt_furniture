'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Promotion } from '@/types'
import {Button} from "@/components/ui/button";

interface Props {
  promotion: Promotion
}

export default function PromotionCard({ promotion }: Props) {
  const mainPhoto = promotion.photos && promotion.photos.length > 0
    ? promotion.photos[0].photoUrl
    : null

  const thumbnailPhotos = promotion.photos?.slice(1) || []

  return (
    <Card className="overflow-hidden">
      {/* Главное фото */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {mainPhoto ? (
          <Image
            src={mainPhoto}
            alt={promotion.title}
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
            {promotion.title}
          </CardTitle>

          <p className="text-2xl font-bold text-primary mt-3">
            {promotion.price.toLocaleString('ru-RU')} ₽
          </p>

          {promotion.size && (
            <p className="text-sm text-muted-foreground mt-2">
              Размер: {promotion.size}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Изменить</Button>
          <Button variant="destructive">Удалить</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-gray-800 rounded-full">
            {promotion.category}
          </span>

          {promotion.material && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
              {promotion.material}
            </span>
          )}

          {promotion.style && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
              {promotion.style}
            </span>
          )}
        </div>

        {/* Превью дополнительных фото */}
        {thumbnailPhotos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
            {thumbnailPhotos.map((photo, index) => (
              <div
                key={index}
                className="shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200 bg-gray-50"
              >
                <Image
                  src={photo.photoUrl}  // или photo_url
                  alt={`Доп. фото ${index + 2}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Индикатор количества фото (опционально, если хочешь оставить) */}
        {promotion.photos && promotion.photos.length > 1 && (
          <p className="text-xs text-muted-foreground">
            Всего фото: {promotion.photos.length}
          </p>
        )}
      </CardContent>
    </Card>
  )
}