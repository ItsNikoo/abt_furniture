'use client'

import { useState } from 'react'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { postMaterialAction } from '@/actions/materials'

export default function AddMaterialsContainer() {
  const [material, setMaterial] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      postMaterialAction(material)
      setSuccess('Материал успешно добавлен!')
      setMaterial('')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 2000)
    } catch (error) {
      setSuccess('Произошла ошибка при добавлении материала: ' + error)
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Добавить материал</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление материала</DialogTitle>
          <DialogDescription>
            Добавьте материал здесь
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label>Материал</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
              />
            </div>
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary">Отмена</Button>
              </DialogClose>
              <Button type="submit">Добавить материал</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
