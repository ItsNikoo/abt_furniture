'use client'

import {Photo, Review, ReviewData} from "@/types";
import React, {useState, useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Cookies from "js-cookie";
import {patchReviewAction} from "@/actions/reviews";
import {Trash2} from "lucide-react";

interface UpdateReviewContainerProps {
  review: Review,
  isOpen: boolean,
  onCloseAction: () => void,
}

export default function UpdateReviewContainer(
  {
    review,
    isOpen,
    onCloseAction
  }: UpdateReviewContainerProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<ReviewData>({
    name: review.name,
    review: review.review,
    rank: review.rank,
    date: review.date,
    location: review.location,
    photos: review.photos ?? [],
    photoFiles: undefined,
    deletePhotos: undefined,
  });

  // Основной useEffect только для инициализации formData
  useEffect(() => {
    setFormData({
      name: review.name,
      review: review.review,
      rank: review.rank,
      date: review.date,
      location: review.location,
      photos: review.photos ?? [],
      photoFiles: undefined,
      deletePhotos: undefined,
    })
    // Очищаем превью при инициализации
    photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPhotoPreviews([])
  }, [review, isOpen])

  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rank" ? (value === '' ? 0 : Number(value)) : value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setFormData(prev => ({...prev, photoFiles: undefined}));
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
      setPhotoPreviews([]);
      return;
    }

    // Очищаем старые превью
    photoPreviews.forEach((url) => URL.revokeObjectURL(url));

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFormData(prev => ({...prev, photoFiles: newFiles}));
    setPhotoPreviews(newPreviews);
  }

  // Переключение пометки на удаление для существующего фото
  function toggleDeletePhoto(photoUrl: string) {
    setFormData(prev => {
      const currentDeletes = prev.deletePhotos || [];
      if (currentDeletes.includes(photoUrl)) {
        // снимаем пометку
        return {...prev, deletePhotos: currentDeletes.filter(url => url !== photoUrl)};
      } else {
        // помечаем на удаление
        return {...prev, deletePhotos: [...currentDeletes, photoUrl]};
      }
    });
  }

  // Получаем URL фото (поддержка string и объекта с photoUrl)
  function getPhotoUrl(photo: Photo): string {
    return photo.photoUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (
        !formData.name.trim() ||
        !formData.review.trim() ||
        !formData.location.trim() ||
        formData.rank <= 0 ||
        !formData.date.trim()
      ) {
        setError("Заполните обязательные поля");
        return;
      }

      const token = Cookies.get('token');
      if (!token) throw new Error("Токен авторизации не найден");

      await patchReviewAction(review.id, formData, token);
      setSuccess("Отзыв успешно обновлен!");
      setTimeout(() => onCloseAction(), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCloseAction()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактирование отзыва</DialogTitle>
          <DialogDescription>
            В этом окне вы можете редактировать отзыв.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите имя"
                required
                className="mt-1"
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
                onChange={handleChange}
                placeholder="Оценка"
                required
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
                onChange={handleChange}
                placeholder="Введите местоположение"
                required
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
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="review">Текст отзыва</Label>
            <Textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Текст отзыва"
              required
              className="mt-1 min-h-[120px]"
            />
          </div>

          {/* Текущие фотографии с возможностью удаления */}
          {formData.photos && formData.photos.length > 0 && (
            <div>
              <Label>Текущие фотографии (кликните, чтобы удалить)</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-3">
                {formData.photos.map((photo, index) => {
                  const photoUrl = getPhotoUrl(photo);
                  const isMarkedForDelete = formData.deletePhotos?.includes(photoUrl);

                  return (
                    <div
                      key={index}
                      className="relative aspect-square cursor-pointer group"
                      onClick={() => toggleDeletePhoto(photoUrl)}
                    >
                      <Image
                        src={photoUrl}
                        alt={`Фото ${index + 1}`}
                        fill
                        className={`object-cover rounded-lg border-2 transition-all ${
                          isMarkedForDelete
                            ? "border-red-500 opacity-60"
                            : "border-gray-300"
                        }`}
                      />

                      {/* Оверлей при наведении или пометке */}
                      <div
                        className={`absolute inset-0 rounded-lg flex items-center justify-center transition-all ${
                          isMarkedForDelete
                            ? "bg-red-900/60"
                            : "bg-black/0 group-hover:bg-black/50"
                        }`}
                      >
                        <Trash2
                          className={`w-8 h-8 text-white transition-opacity ${
                            isMarkedForDelete ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>

                      {/* Номер фото */}
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Добавление новых фото */}
          <div>
            <Label htmlFor="newPhotos">Добавить новые фотографии</Label>
            <Input
              id="newPhotos"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleFileChange}
              className="mt-2"
            />

            {photoPreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">Предпросмотр новых фото:</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={preview}
                        alt={`Новое фото ${index + 1}`}
                        fill
                        className="object-cover rounded-lg border-2 border-dashed border-blue-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Сообщения */}
          {error && <p className="text-red-500 text-center font-medium">{error}</p>}
          {success && <p className="text-green-500 text-center font-medium">{success}</p>}

          {/* Кнопки */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onCloseAction}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Обновление..." : "Обновить отзыв"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}