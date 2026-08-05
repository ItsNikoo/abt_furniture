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
import dynamic from 'next/dynamic'
import {cn} from "@/lib/utils"

const ContactForm = dynamic(
  () => import('@/components/shared/ContactForm').then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="h-48 animate-pulse rounded-lg bg-gray-100" />
    ),
  },
)

type MainOrderContainerProps = {
  triggerText?: string
  title?: string
  description?: string
  submitText?: string
  successMessage?: string
  triggerClassName?: string
}

export default function MainOrderContainer({
  triggerText = 'Заказать проект',
  title = 'Заказать проект',
  description = 'Мы готовы реализовать любой амбициозный проект. Оставьте заявку, и мы свяжемся с вами для обсуждения деталей.',
  submitText = 'Заказать проект',
  successMessage = 'Спасибо! Ваша заявка успешно отправлена.',
  triggerClassName,
}: MainOrderContainerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'font-bold px-4 py-4 text-sm w-full sm:w-auto sm:px-8 sm:py-6 sm:text-base md:px-15 md:py-7',
            triggerClassName,
          )}
        >
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <ContactForm
          submitText={submitText}
          successMessage={successMessage}
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
