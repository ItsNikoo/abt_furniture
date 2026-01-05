'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SaleData } from '@/types'
import { postSaleAction } from '@/actions/sales'
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function AddSaleContainer() {
  const [formData, setFormData] = useState<SaleData>({
    description: '',
    photoFile: null,
    mobilePhotoFile: null,
    link: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string | null>(null)

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

      // Проверка: ОБА фото должны быть загружены
      if (!formData.photoFile || !formData.mobilePhotoFile) {
        setError('Необходимо загрузить оба фото (и для компьютера, и для телефона)')
        setIsLoading(false)
        return
      }

      const token = Cookies.get('token')
      await postSaleAction(formData, token as string)

      // Очистка формы
      setFormData({
        description: '',
        photoFile: null,
        mobilePhotoFile: null,
        link: '',
      })
      setPreviewUrl(null)
      setMobilePreviewUrl(null)

      setSuccess('Акция успешно создана!')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 2000)
    } catch (error) {
      setError('Не удалось создать акцию. Пожалуйста, попробуйте еще раз. ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Добавить акцию</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавление акции</DialogTitle>
          <DialogDescription>
            В этом окне вы можете создать акцию. Загрузите оба фото (и для компьютера, и для телефона).
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
                placeholder="Введите описание акции"
                required
              />
            </div>

            <div>
              <Label htmlFor="photoFile">Фотография для компьютеров</Label>
              <Input
                id="photoFile"
                name="photoFile"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handlePhotoChange}
              />
              {previewUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Предпросмотр (Desktop):</p>
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

            <div>
              <Label htmlFor="mobilePhotoFile">Фотография для телефонов</Label>
              <Input
                id="mobilePhotoFile"
                name="mobilePhotoFile"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleMobilePhotoChange}
              />
              {mobilePreviewUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Предпросмотр (Mobile):</p>
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

            <div>
              <Label htmlFor="link">Ссылка на акцию</Label>
              <Input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com/sale"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="flex justify-end gap-2 mt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Создание...' : 'Создать акцию'}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}