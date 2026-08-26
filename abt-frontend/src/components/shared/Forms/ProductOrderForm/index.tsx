'use client'

import {Product, Promotion} from '@/types/types'
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
import {ContactForm} from "@/components/shared/Forms/ContactForm"
import {MessageCircle, Phone} from 'lucide-react'

export default function ProductOrderForm({entity}: { entity: Product | Promotion }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-5 flex flex-col items-start gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="min-h-14 w-full px-8 text-base font-bold shadow-md shadow-mainPurple/20 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:text-lg my-2">
            Заказать проект
          </Button>
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

      <div className="flex items-center gap-4 text-sm font-medium sm:text-base">
        <a
          href="tel:+79267232880"
          className="inline-flex items-center gap-1.5 text-gray-700 transition-colors hover:text-mainPurple focus-visible:outline-none focus-visible:underline"
        >
          <Phone className="h-4 w-4"/>
          +7 (926) 723-28-80
        </a>
        <a
          href="https://wa.me/79267232880"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:underline"
        >
          <MessageCircle className="h-4 w-4"/>
          Напишите в WhatsApp
        </a>
      </div>
    </div>
  )
}
