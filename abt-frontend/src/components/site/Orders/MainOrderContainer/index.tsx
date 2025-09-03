'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { startTransition, useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { postContactAction } from '@/actions/contact'

export default function MainOrderContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    comment: '',
    honeypot: '', // Ловушечное поле
  })
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState({
    consent: '',
  })
  const [formLoadTime, setFormLoadTime] = useState<number>(0) // Время загрузки формы

  // Засекаем время когда открылась форма
  useEffect(() => {
    if (isOpen) {
      setFormLoadTime(Date.now())
      // Сбрасываем состояние при открытии
      setFormData({
        phone: '',
        comment: '',
        honeypot: '',
      })
      setConsent(false)
      setSuccess(null)
      setError(null)
    }
  }, [isOpen])

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const cleanedValue = value.replace(/\D/g, '')

    let formattedValue = ''
    if (cleanedValue.length > 0) {
      formattedValue = '+7 '
      if (cleanedValue.length > 1) {
        formattedValue += `(${cleanedValue.substring(1, 4)}`
      }
      if (cleanedValue.length > 4) {
        formattedValue += `) ${cleanedValue.substring(4, 7)}`
      }
      if (cleanedValue.length > 7) {
        formattedValue += `-${cleanedValue.substring(7, 9)}`
      }
      if (cleanedValue.length > 9) {
        formattedValue += `-${cleanedValue.substring(9, 11)}`
      }
    }

    setFormData(prev => ({
      ...prev,
      phone: formattedValue,
    }))
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      comment: e.target.value,
    }))
  }

  // Обработчик для ловушечного поля (на всякий случай, хотя оно скрыто)
  function handleHoneypotChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      honeypot: e.target.value,
    }))
  }

  function handleConsentChange(checked: boolean) {
    setConsent(checked)
    if (checked) {
      setFormErrors(prev => ({ ...prev, consent: '' }))
    }
  }

  function validateForm() {
    let isValid = true
    const newErrors = { consent: '' }

    if (!consent) {
      newErrors.consent = 'Необходимо дать согласие на обработку данных'
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Time Check: проверяем что прошло хотя бы 2 секунды
    const submitTime = Date.now()
    const formFillTime = submitTime - formLoadTime

    if (formFillTime < 2000) {
      setError('Пожалуйста, заполните форму внимательнее')
      return
    }

    setIsSubmitting(true)

    startTransition(async () => {
      try {
        console.log('Отправленные данные:', {
          phone: formData.phone,
          comment: formData.comment,
          consent: consent,
          honeypot: formData.honeypot, // Отправляем ловушечное поле
          formLoadTime: formLoadTime,   // Отправляем время загрузки
        })

        const response = await postContactAction(
          formData.phone,
          formData.comment,
          consent,
          formData.honeypot, // Передаем ловушечное поле
          formLoadTime,       // Передаем время загрузки
        )
        console.log(response)

        setSuccess('Ваш запрос успешно отправлен! Мы свяжемся с вами в ближайшее время.')
        setFormData({
          phone: '',
          comment: '',
          honeypot: '',
        })
        setConsent(false)
      } catch (e) {
        setError(
          e instanceof Error
          ? `Произошла ошибка при отправке данных: ${e.message}`
          : 'Неизвестная ошибка. Пожалуйста, попробуйте еще раз.',
        )
      } finally {
        setIsSubmitting(false)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-mainPurple font-bold rounded-xl px-4 py-4 text-sm w-full sm:w-auto sm:px-8 sm:py-6 sm:text-base md:px-15 md:py-7"
        >
          Заказать проект
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 sm:mx-0">
        <DialogHeader>
          <DialogTitle className={'font-bold text-xl'}>Заказать проект</DialogTitle>
          <DialogDescription>
            Мы готовы реализовать любой амбициозный проект. Оставьте заявку, и мы свяжемся с вами для обсуждения
            деталей.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Ловушечное поле - скрыто от пользователей */}
          <input
            type="text"
            name="company"
            value={formData.honeypot}
            onChange={handleHoneypotChange}
            style={{
              display: 'none',
              position: 'absolute',
              left: '-9999px',
            }}
            autoComplete="off"
            tabIndex={-1}
          />

          <Input
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={'py-6'}
            placeholder="+7 (___) ___-__-__"
            type="tel"
            required
            maxLength={18}
          />
          <Input
            name="comment"
            value={formData.comment}
            onChange={handleCommentChange}
            className={'py-6'}
            placeholder="Комментарий или пожелания..."
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
              <p className="text-muted-foreground text-sm">
                Нажимая на эту кнопку, вы соглашаетесь на обработку персональных данных.{' '}
                <a href="/privacy-policy" className="text-mainPurple hover:underline">
                  Подробнее
                </a>
              </p>
              {formErrors.consent && (
                <p className="text-red-500 text-sm">{formErrors.consent}</p>
              )}
            </div>
          </div>

          {success && <p className={'text-green-600 text-sm'}>{success}</p>}
          {error && <p className={'text-red-400 text-sm'}>{error}</p>}

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-mainPurple hover:bg-mainPurple/90"
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
