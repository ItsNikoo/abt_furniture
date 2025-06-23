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
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Button} from '@/components/ui/button'

export default function ProductOrderContainer({product}: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    product: product.title,
    phone: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value, files} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      console.log('Отправленные данные:', {
        phone: formData.phone,
        comment: formData.comment,
        product: formData.product,
      })
      setIsSubmitting(true)
      setSuccess('Ваш запрос успешно отправлен! Мы свяжемся с вами в ближайшее время.')
      setFormData({
        phone: '',
        comment: '',
        product: product.title,
      })

      setTimeout(() => {
        setIsOpen(false)
        setSuccess(null)
        setIsSubmitting(false)
      }, 3000)
    } catch (e) {
      setError(`Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз. (${e})`)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={'my-3 font-bold rounded-xl text-base'}>Заказать
          проект</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'font-bold text-xl'}>{product.title}</DialogTitle>
          <DialogDescription>
            Напишите нам, если хотите этот проект.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={'py-6'}
            placeholder="Введите номер телефона"
            type="tel"
            required
          />
          <Input
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className={'py-6'}
            placeholder="Комментарий, пожелания или желаемые размеры..."
          />
          {success && <p className={'text-green-400 text-sm'}>{success}</p>}
          {error && <p className={'text-red-400 text-sm'}>{error}</p>}
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Заказать проект'}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
              >
                Отмена
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
