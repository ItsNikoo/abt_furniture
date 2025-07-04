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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Material } from '@/types'
import { patchMaterialAction } from '@/actions/materials'

export default function UpdateMaterialContainer({ material }: { material: Material }) {
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [materialQuery, setMaterialQuery] = useState<string>(material.material)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await patchMaterialAction(material.id, materialQuery)
      setSuccess('Материал успешно обновлен!')
      setMaterialQuery('')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 2000)
    } catch (error) {
      setSuccess('Произошла ошибка при обновлении материала: ' + error)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение материала</DialogTitle>
          <DialogDescription>
            Окно изменения материала
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label>Материал</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={materialQuery}
                onChange={(e) => setMaterialQuery(e.target.value)}
                required
              />
            </div>
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary">Отмена</Button>
              </DialogClose>
              <Button type="submit">Изменить материал</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
