'use client'

import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Sale, SaleData } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { patchSaleAction } from '@/actions/sales'
import Cookies from 'js-cookie'

export default function UpdateSaleContainer({ sale }: { sale: Sale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<SaleData>({
    title: sale.title,
    description: sale.description,
    photo: sale.photo,
    link: sale.link,
    photoFile: null,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

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
      await patchSaleAction(sale.id, formData, token as string)
      setPreviewUrl(null)
      setSuccess('Акция успешно изменена!')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 2000)
    } catch (error) {
      setError('Не удалось обновить акцию. Пожалуйста, попробуйте позже: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-mainPurple hover:text-white">
            <Pencil className="h-4 w-4"/>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование акции</DialogTitle>
            <DialogDescription>
              В этом окне вы можете редактировать акцию.
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
                  required
                />
              </div>
              <div>
                {formData.photo && (
                  <Image src={formData.photo} alt={`Фотография акции ${sale.id}`} width={128}
                         height={128}/>
                )}
                <div>
                  <Label>Добавить фото</Label>
                  <Input
                    id="photoFile"
                    name="photoFile"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileChange}
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
              </div>
              <div>
                <Label>Ссылка на акцию</Label>
                <Input
                  id="link"
                  name="link"
                  type="text"
                  value={formData.link}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <div className="flex justify-end gap-2 mt-2">
                <DialogClose asChild>
                  <Button variant="secondary">Отмена</Button>
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
