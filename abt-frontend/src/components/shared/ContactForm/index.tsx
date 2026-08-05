'use client'

import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {startTransition, useEffect, useState, useCallback} from "react"
import {postContactAction} from "@/actions/contact"

type ContactFormProps = {
  title?: string,
  submitText?: string
  successMessage?: string
  onSuccess?: () => void
  className?: string
  product?: string,
}

export function ContactForm(
  {
    title,
    submitText = "Отправить",
    successMessage = "Спасибо! Ваша заявка успешно отправлена.",
    onSuccess,
    className = "",
    product,
  }: ContactFormProps) {
  const [consent, setConsent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',  // Добавлено: состояние для email
    comment: '',
    honeypot: ''
  })
  const [files, setFiles] = useState<File[]>([])  // Добавлено: состояние для файлов (фото)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',  // Добавлено: ошибка для email
    consent: '',
  })
  const [formLoadTime, setFormLoadTime] = useState(Date.now())

  // Сбрасываем время при монтировании/переиспользовании
  useEffect(() => {
    setFormLoadTime(Date.now())
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleanedValue = value.replace(/\D/g, '')

    let formattedValue = ''
    if (cleanedValue.length > 0) {
      formattedValue = '+7 '
      if (cleanedValue.length > 1) formattedValue += `(${cleanedValue.substring(1, 4)}`
      if (cleanedValue.length > 4) formattedValue += `) ${cleanedValue.substring(4, 7)}`
      if (cleanedValue.length > 7) formattedValue += `-${cleanedValue.substring(7, 9)}`
      if (cleanedValue.length > 9) formattedValue += `-${cleanedValue.substring(9, 11)}`
    }

    setFormData(prev => ({...prev, phone: formattedValue}))
    if (formErrors.phone) setFormErrors(prev => ({...prev, phone: ''}))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))

    if (name === 'name' && formErrors.name) {
      setFormErrors(prev => ({...prev, name: ''}))
    }
    if (name === 'email' && formErrors.email) {  // Добавлено: очистка ошибки для email
      setFormErrors(prev => ({...prev, email: ''}))
    }
  }

  // Добавлено: обработчик для файлов
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[]
    // Фильтруем только изображения
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'))
    setFiles(imageFiles)
    // Очищаем input после выбора (для повторного выбора тех же файлов)
    e.target.value = ''
  }, [])

  const handleConsentChange = (checked: boolean) => {
    setConsent(checked)
    if (checked && formErrors.consent) {
      setFormErrors(prev => ({...prev, consent: ''}))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {name: '', phone: '', email: '', consent: ''}

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя'
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
      isValid = false
    }

    const cleanedPhone = formData.phone.replace(/\D/g, '')
    if (!formData.phone) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона'
      isValid = false
    } else if (cleanedPhone.length < 11) {
      newErrors.phone = 'Введите корректный номер телефона'
      isValid = false
    }

    // Валидация email (необязательное)
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Введите корректный email адрес'
      isValid = false
    }

    if (!consent) {
      newErrors.consent = 'Необходимо дать согласие на обработку данных'
      isValid = false
    }

    // Опционально: ограничение на количество/размер файлов
    if (files.length > 5) {  // Пример: max 5 фото
      setError('Можно прикрепить не более 5 фотографий')
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    if (!validateForm()) return

    if (formData.honeypot !== '') {
      console.warn('Honeypot triggered')
      return
    }

    const fillTime = Date.now() - formLoadTime
    if (fillTime < 2000) {
      setError('Пожалуйста, заполните форму внимательнее')
      return
    }

    setIsSubmitting(true)

    // Используем FormData для отправки файлов
    const submitFormData = new FormData()
    submitFormData.append('name', formData.name.trim())
    submitFormData.append('phone', formData.phone)
    submitFormData.append('email', formData.email.trim())  // Добавлено: email
    submitFormData.append('comment', formData.comment)
    submitFormData.append('consent', consent.toString())
    if (product) submitFormData.append('product', product)

    // Добавляем файлы
    files.forEach(file => {
      submitFormData.append('photos', file)
    })

    startTransition(async () => {
      try {
        const result = await postContactAction(submitFormData)

        if (!result.success) {
          setError(result.error || 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.')
          return
        }

        setSuccess(successMessage)

        // Не учитываем ботов, пойманных honeypot'ом, в аналитике
        if (!result.isBot && typeof window !== 'undefined' && window.ym) {
          window.ym(106436886, 'reachGoal', 'form_done')
        }

        // Очистка формы
        setFormData({name: '', phone: '', email: '', comment: '', honeypot: ''})
        setConsent(false)
        setFiles([])

        setTimeout(() => setSuccess(null), 5000)
        onSuccess?.()

      } catch (err) {
        console.error('Ошибка отправки:', err)
        setError('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.')
      } finally {
        setIsSubmitting(false)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleInputChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {title && <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>}

      <div>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Имя"
          className="py-5"
          required
        />
        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
      </div>

      <div>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Телефон"
          type="tel"
          className="py-5"
          maxLength={18}
          required
        />
        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
      </div>

      {/* Добавлено: поле для email (необязательное) */}
      <div>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email (опционально)"
          className="py-5"
        />
        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
      </div>

      <Textarea
        name="comment"
        value={formData.comment}
        onChange={handleInputChange}
        placeholder="Комментарий"
        rows={4}
      />

      {/* Добавлено: поле для файлов (необязательное, только фото) */}
      <div>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            Выбрано файлов: {files.length} {files.length === 1 ? 'фото' : 'фото'}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <Checkbox
            checked={consent}
            onCheckedChange={handleConsentChange}
            className="mt-0.5"
          />
          <span>
            Я согласен с{" "}
            <a href="/privacy-policy" className="underline hover:text-gray-800">
              политикой конфиденциальности
            </a>
          </span>
        </label>
        {formErrors.consent && <p className="text-red-500 text-xs mt-1">{formErrors.consent}</p>}
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
        {isSubmitting ? 'Отправка...' : submitText}
      </Button>
    </form>
  )
}
