'use client'

import {Product} from '@/types'
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
import {ContactForm} from "@/components/ui/ContactForm";

export default function ProductOrderContainer({product}: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false)
    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={'my-3 font-bold rounded-xl text-base'}>Заказать проект</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'font-bold text-2xl'}>{product.title}</DialogTitle>
          <DialogDescription>
            Напишите нам, если хотите этот проект, и мы подготовим уникальное решение персонально для вас.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          submitText="Заказать проект"
          successMessage="Спасибо! Ваша заявка успешно отправлена."
          onSuccess={() => setTimeout(() => setIsOpen(false), 3000)}
          product={product.title}
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
