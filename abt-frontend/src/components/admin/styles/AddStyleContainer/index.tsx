'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
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
import { postStyleAction } from '@/actions/styles'
import Cookies from 'js-cookie'

export default function AddStyleContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const [style, setStyle] = useState<string>('')
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const token = Cookies.get('token')
      await postStyleAction(style, token as string)
      setSuccess('Стиль успешно добавлен!')
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
        setStyle('')
      }, 1000)
    } catch (error) {
      setSuccess('Произошла ошибка при добавлении стиля: ' + error)
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Добавить стиль</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление стиля</DialogTitle>
          <DialogDescription>
            Добавьте стиль здесь
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label>Стиль</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                required
              />
            </div>
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary">Отмена</Button>
              </DialogClose>
              <Button type="submit">Добавить стиль</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
