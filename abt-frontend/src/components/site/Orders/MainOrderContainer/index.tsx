'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {ContactForm} from "@/components/shared/ContactForm";

export default function MainOrderContainer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mainPurple font-bold rounded-xl px-4 py-4 text-sm w-full sm:w-auto sm:px-8 sm:py-6 sm:text-base md:px-15 md:py-7">
          Заказать проект
        </Button>
      </DialogTrigger>

      <DialogContent className="mx-4 sm:mx-0">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Заказать проект</DialogTitle>
          <DialogDescription>
            Мы готовы реализовать любой амбициозный проект. Оставьте заявку, и мы свяжемся с вами для обсуждения деталей.
          </DialogDescription>
        </DialogHeader>

        <ContactForm
          submitText="Заказать проект"
          successMessage="Спасибо! Ваша заявка успешно отправлена."
          onSuccess={() => setTimeout(() => setIsOpen(false), 3000)}
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