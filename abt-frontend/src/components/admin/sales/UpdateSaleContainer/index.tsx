'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Sale, SaleData } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { patchSaleAction } from '@/actions/sales'
import Cookies from 'js-cookie'

interface Props{
  sale: Sale,
  isOpen: boolean,
  onCloseAction: () => void,
}

export default function UpdateSaleContainer({ sale, isOpen, onCloseAction }:Props) {
  const [formData, setFormData] = useState<SaleData>({
    description: sale.description,
    photo: sale.photo,
    mobilePhoto: sale.mobilePhoto,
    link: sale.link,
    photoFile: null,
    mobilePhotoFile: null,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, photoFile: file }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleMobilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, mobilePhotoFile: file }))
      setMobilePreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      setError(null)

      const token = Cookies.get('token')
      await patchSaleAction(sale.id, formData, token as string)

      setPreviewUrl(null)
      setMobilePreviewUrl(null)
      setSuccess('Акция успешно изменена!')

      setTimeout(() => onCloseAction(), 2000)
    } catch (error) {
      setError('Не удалось обновить акцию. Пожалуйста, попробуйте позже: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onCloseAction()}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактирование акции</DialogTitle>
            <DialogDescription>
              В этом окне вы можете редактировать акцию. Загрузите новое фото, чтобы заменить существующее.
            </DialogDescription>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="description">Описание</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Desktop фото */}
              <div>
                <Label>Фотография для компьютеров</Label>
                {formData.photo && !previewUrl && (
                  <div className="mt-2 mb-2">
                    <p className="text-sm text-gray-600 mb-1">Текущее фото (Desktop):</p>
                    <Image
                      src={formData.photo}
                      alt={`Фотография акции ${sale.id} для компьютеров`}
                      className="w-full max-w-md h-auto object-cover rounded-md border"
                      width={400}
                      height={200}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="photoFile">Загрузить новое фото (Desktop)</Label>
                  <Input
                    id="photoFile"
                    name="photoFile"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handlePhotoChange}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">Новое фото (Desktop):</p>
                      <Image
                        src={previewUrl}
                        alt="Предпросмотр для компьютеров"
                        className="w-full max-w-md h-auto object-cover rounded-md border"
                        width={400}
                        height={200}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile фото */}
              <div>
                <Label>Фотография для телефонов</Label>
                {formData.mobilePhoto && !mobilePreviewUrl && (
                  <div className="mt-2 mb-2">
                    <p className="text-sm text-gray-600 mb-1">Текущее фото (Mobile):</p>
                    <Image
                      src={formData.mobilePhoto}
                      alt={`Фотография акции ${sale.id} для телефонов`}
                      className="w-full max-w-xs h-auto object-cover rounded-md border"
                      width={300}
                      height={200}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="mobilePhotoFile">Загрузить новое фото (Mobile)</Label>
                  <Input
                    id="mobilePhotoFile"
                    name="mobilePhotoFile"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleMobilePhotoChange}
                  />
                  {mobilePreviewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">Новое фото (Mobile):</p>
                      <Image
                        src={mobilePreviewUrl}
                        alt="Предпросмотр для телефонов"
                        className="w-full max-w-xs h-auto object-cover rounded-md border"
                        width={300}
                        height={200}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="link">Ссылка на акцию</Label>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  value={formData.link}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div className="flex justify-end gap-2 mt-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" disabled={isLoading}>
                    Отмена
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Обновление...' : 'Обновить акцию'}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}