'use client'

import {Product, Promotion} from '@/types'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {ContactForm} from "@/components/shared/ContactForm"

export default function ProductOrderContainer({entity}: { entity: Product | Promotion }) {
  const [isOpen, setIsOpen] = useState(false)
    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={'my-3 font-bold text-base'}>Заказать проект</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'font-bold text-2xl'}>{entity.title}</DialogTitle>
          <DialogDescription>
            Напишите нам, если хотите этот проект, и мы подготовим уникальное решение персонально для вас.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          submitText="Заказать проект"
          successMessage="Спасибо! Ваша заявка успешно отправлена."
          onSuccess={() => setTimeout(() => setIsOpen(false), 3000)}
          product={entity.title}
        />
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Отмена
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
