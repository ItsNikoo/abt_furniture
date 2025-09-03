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
    title: '',
    description: '',
    photoFile: null,
    link: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, photoFile: file }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const token = Cookies.get('token')
      await postSaleAction(formData, token as string)
      setFormData({
        title: '',
        description: '',
        photoFile: null,
        link: '',
      })
      setPreviewUrl(null)
      setSuccess('Акция успешно создана!')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 2000)
    } catch (error) {
      setError('Не удалось создать акцию. Пожалуйста, попробуйте еще раз.' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Добавить акцию</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление акции</DialogTitle>
          <DialogDescription>
            В этом окне вы можете создать акцию. Заполните ВСЕ поля, чтобы акция была создана.
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label>Название</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                required/>
            </div>
            <div>
              <Label>Фотография</Label>
              <Input
                id="photoFile"
                name="photoFile"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
                required
              />
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Предпросмотр"
                  className="mt-2 w-32 h-32 object-cover rounded-md border"
                  width={128}
                  height={128}
                />
              )}
            </div>
            <div>
              <Label>Ссылка на акцию</Label>
              <Input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Отмена</Button>
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
