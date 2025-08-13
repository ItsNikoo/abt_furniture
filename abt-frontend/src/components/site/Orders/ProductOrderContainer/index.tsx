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
import {Checkbox} from "@/components/ui/checkbox";

export default function ProductOrderContainer({product}: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    product: product.title,
    phone: '',
    comment: ''
  })
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState({
    phone: '',
    consent: '',
  })

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      comment: e.target.value
    }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, '');

    let formattedValue = '';
    if (cleanedValue.length > 0) {
      formattedValue = '+7 ';
      if (cleanedValue.length > 1) {
        formattedValue += `(${cleanedValue.substring(1, 4)}`;
      }
      if (cleanedValue.length > 4) {
        formattedValue += `) ${cleanedValue.substring(4, 7)}`;
      }
      if (cleanedValue.length > 7) {
        formattedValue += `-${cleanedValue.substring(7, 9)}`;
      }
      if (cleanedValue.length > 9) {
        formattedValue += `-${cleanedValue.substring(9, 11)}`;
      }
    }

    setFormData(prev => ({
      ...prev,
      phone: formattedValue
    }));

    // Очищаем ошибку при изменении
    if (formattedValue.length > 0) {
      setFormErrors(prev => ({...prev, phone: ''}))
    }
  }

  function handleConsentChange(checked: boolean) {
    setConsent(checked)
    if (checked) {
      setFormErrors(prev => ({...prev, consent: ''}))
    }
  }

  function validateForm() {
    let isValid = true
    const newErrors = {
      phone: formData.phone.trim() === '' ? 'Введите номер телефона' : '',
      consent: !consent ? 'Необходимо дать согласие на обработку данных' : ''
    }

    setFormErrors(newErrors)
    return isValid && !newErrors.phone && !newErrors.consent
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      console.log("Отправленные данные:", formData, "Согласие:", consent)

      setSuccess('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
      setFormData({
        phone: '',
        comment: '',
        product: product.title
      })
      setConsent(false)

      // Автоматически сбрасываем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch (err) {
      setError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
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
          <div>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className='py-4 sm:py-[25px] text-sm sm:text-base'
              placeholder="+7 (___) ___-__-__"
              type="tel"
              required
              maxLength={18}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
            )}
          </div>
          <Input
            name="comment"
            value={formData.comment}
            onChange={handleCommentChange}
            className={'py-6'}
            placeholder="Комментарий, пожелания или желаемые размеры..."
          />
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent-checkbox"
              checked={consent}
              onCheckedChange={(checked) => handleConsentChange(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="consent-checkbox" className="font-normal">
                Принимаю политику конфиденциальности
              </Label>
              <p className="text-muted-foreground text-[13px]">
                Нажимая на эту кнопку, вы соглашаетесь на обработку персональных данных.{" "}
                <a href="/privacy-policy" className="text-mainPurple hover:underline">
                  Подробнее
                </a>
              </p>
              {formErrors.consent && (
                <p className="text-red-500 text-xs">{formErrors.consent}</p>
              )}
            </div>
          </div>
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
