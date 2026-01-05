'use client'

import {Photo, Promotion, PromotionData} from "@/types";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { patchPromotionAction } from "@/actions/promotions";
import { Trash2 } from "lucide-react"; // иконка корзины (установи: npm i lucide-react)

interface UpdatePromotionContainerProps {
  promotion: Promotion;
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function UpdatePromotionContainer({promotion, isOpen, onCloseAction}: UpdatePromotionContainerProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<PromotionData>({
    title: promotion.title,
    productSlug: promotion.productSlug,
    price: promotion.price,
    description: promotion.description,
    size: promotion.size,
    category: promotion.category,
    material: promotion.material ?? "",
    style: promotion.style ?? "",
    photos: promotion.photos ?? [],
    photoFiles: undefined,
    deletePhotos: undefined, // будет массив строк — URL фото на удаление
  });

  useEffect(() => {
    setFormData({
      title: promotion.title,
      productSlug: promotion.productSlug,
      price: promotion.price,
      description: promotion.description,
      size: promotion.size,
      category: promotion.category,
      material: promotion.material ?? "",
      style: promotion.style ?? "",
      photos: promotion.photos ?? [],
      photoFiles: undefined,
      deletePhotos: undefined,
    });
    setPhotoPreviews([]);
  }, [promotion, isOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) || 0 : value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setFormData(prev => ({ ...prev, photoFiles: undefined }));
      setPhotoPreviews([]);
      return;
    }

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setPhotoPreviews([...photoPreviews, ...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    setFormData(prev => ({ ...prev, photoFiles: newFiles }));
  }

  // Переключение пометки на удаление для существующего фото
  function toggleDeletePhoto(photoUrl: string) {
    setFormData(prev => {
      const currentDeletes = prev.deletePhotos || [];
      if (currentDeletes.includes(photoUrl)) {
        // снимаем пометку
        return { ...prev, deletePhotos: currentDeletes.filter(url => url !== photoUrl) };
      } else {
        // помечаем на удаление
        return { ...prev, deletePhotos: [...currentDeletes, photoUrl] };
      }
    });
  }

  // Получаем URL фото (поддержка string и объекта с photoUrl)
  function getPhotoUrl(photo: Photo): string {
    return photo.photoUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = Cookies.get('token');
      if (!token) throw new Error("Токен авторизации не найден");

      await patchPromotionAction(promotion.id, formData, token);
      setSuccess("Спецпредложение успешно обновлено!");
      setTimeout(() => onCloseAction(), 2000);
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
          <DialogTitle>Редактирование спецпредложения</DialogTitle>
          <DialogDescription>
            В этом окне вы можете редактировать спецпредложение.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          {/* Поля формы — без изменений */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... все поля как были ... */}
            <div>
              <Label htmlFor="title">Название</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="productSlug">Slug продукта</Label>
              <Input id="productSlug" name="productSlug" value={formData.productSlug} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="price">Цена</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="category">Категория</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="size">Размер</Label>
              <Input id="size" name="size" value={formData.size} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="material">Материал</Label>
              <Input id="material" name="material" value={formData.material || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="style">Стиль</Label>
              <Input id="style" name="style" value={formData.style || ""} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
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
              accept="image/jpeg, image/png, image/webp"
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
              {isLoading ? "Обновление..." : "Обновить спецпредложение"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}