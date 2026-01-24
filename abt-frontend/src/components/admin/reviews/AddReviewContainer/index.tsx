'use client'

import {useEffect, useState} from 'react'
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {ReviewData} from '@/types'
import Image from 'next/image'
import Cookies from "js-cookie"
import {postReviewAction} from "@/actions/reviews"
import {ADMIN_ROUTES} from "@/config/navigation"
import {useRouter} from "next/navigation"

export default function AddReviewContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  const [formData, setFormData] = useState<ReviewData>({
    name: '',
    review: '',
    rank: 0,
    date: '',
    location: '',
    photoFiles: [],
    deletePhotos: []
  })

  const router = useRouter()

  // Очистка object URL при размонтировании или смене файлов
  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photoPreviews])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'rank' ? (value === '' ? 0 : Number(value)) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Очищаем старые превью
    photoPreviews.forEach((url) => URL.revokeObjectURL(url))

    const newFiles = Array.from(files)
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))

    setFormData((prev) => ({
      ...prev,
      photoFiles: newFiles,
    }))
    setPhotoPreviews(newPreviews)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      if (
        !formData.name.trim() ||
        !formData.review.trim() ||
        !formData.location.trim() ||
        formData.rank <= 0 ||
        !formData.date.trim()
      ) {
        setError("Заполните обязательные поля")
        return
      }

      setIsLoading(true)
      const token = Cookies.get('token')

      await postReviewAction(formData, token as string)

      console.log(formData)
      setSuccess("Отзыв успешно создан!")
      setTimeout(() => {
        router.push(ADMIN_ROUTES.REVIEWS.path)
        setSuccess(null)
        setFormData({
          name: '',
          review: '',
          rank: 0,
          date: '',
          location: '',
          photoFiles: [],
          deletePhotos: []
          })
      }, 2000)

    } catch (error) {
      setError('Не удалось создать отзыв: ' + error)
    } finally {
      setIsLoading(false)
      setError(null)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-800">Добавить отзыв</h2>
        </CardHeader>

        <CardContent className="py-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введите имя"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="review">Текст отзыва</Label>
              <Textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                placeholder="Текст отзыва"
                className="mt-1 min-h-[120px]"
              />
            </div>
            <div>
              <Label htmlFor="rank">Оценка (1-5)</Label>
              <Input
                id="rank"
                name="rank"
                type="number"
                min="1"
                max="5"
                value={formData.rank || ''}
                onChange={handleInputChange}
                placeholder="Оценка"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Местоположение</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Введите местоположение"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                name="date"
                type="text"
                value={formData.date}
                placeholder="Введите дату"
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="photos">Фото</Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="mt-1"
              />
              {photoPreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Выбрано файлов: {photoPreviews.length}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {photoPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={preview}
                          alt={`Превью ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-md border border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Добавление...' : 'Добавить отзыв'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}