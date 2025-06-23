'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { CategoryData } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { postCategoryAction } from '@/actions/categories'

export default function AddCategoryContainer() {
  const [formData, setFormData] = useState<CategoryData>({
    category: '',
    categorySlug: '',
    photoFile: null,
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
      await postCategoryAction(formData)
      setPreviewUrl(null)
      setSuccess('Категория успешно создана!')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
        setFormData({
          category: '',
          categorySlug: '',
          photoFile: null,
        })
      }, 1000)
    } catch (error) {
      setError('Не удалось создать категорию. Пожалуйста, попробуйте еще раз.' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Добавить категорию</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление категории</DialogTitle>
          <DialogDescription>
            В этом окне вы можете создать категорию. Заполните ВСЕ поля, чтобы категория была создана.
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label>Категория</Label>
              <Input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Идентификатор категории</Label>
              <Input
                id="categorySlug"
                name="categorySlug"
                type="text"
                value={formData.categorySlug}
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
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Отмена</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Создание...' : 'Создать категорию'}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
