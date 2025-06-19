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
import { Style } from '@/types'
import { patchStyleAction } from '@/actions/styles'

export default function UpdateMaterialContainer({ style }: { style: Style }) {
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [styleQuery, setStyleQuery] = useState<string>(style.style)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      patchStyleAction(style.id, styleQuery)
      setSuccess('Стиль успешно обновлен!')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
      }, 1000)
    } catch (error) {
      setSuccess('Произошла ошибка при обновлении стиля: ' + error)
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
          <DialogTitle>Изменение стиля</DialogTitle>
          <DialogDescription>
            Окно изменения стиля
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label>Стиль</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={styleQuery}
                onChange={(e) => setStyleQuery(e.target.value)}
                required
              />
            </div>
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary">Отмена</Button>
              </DialogClose>
              <Button type="submit">Изменить стиль</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
