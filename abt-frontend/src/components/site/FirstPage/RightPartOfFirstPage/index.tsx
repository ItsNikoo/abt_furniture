"use client"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {startTransition, useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {postContactAction} from "@/actions/contact";
import { motion } from "framer-motion";

export default function RightPartOfFirstPage() {
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
    phone: '',
    consent: '',
  })
  const [formLoadTime, setFormLoadTime] = useState<number>(0) // Время загрузки компонента

  // Засекаем время когда компонент смонтирован
  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSuccess(null);
    setFormData(prev => ({
      ...prev,
      comment: e.target.value
    }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    setSuccess(null)

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

    if (formattedValue.length > 0) {
      setFormErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  function handleConsentChange(checked: boolean) {
    setConsent(checked)
    if (checked) {
      setFormErrors(prev => ({ ...prev, consent: '' }))
    }
  }

  // Обработчик для ловушечного поля
  function handleHoneypotChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      honeypot: e.target.value
    }));
  }

  function validateForm() {
    const isValid = true
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

    // Time Check защита
    const submitTime = Date.now();
    const formFillTime = submitTime - formLoadTime;

    if (formFillTime < 3000) {
      setError('Пожалуйста, заполните форму внимательнее');
      return;
    }

    setIsSubmitting(true);

    startTransition(async () => {
      try {
        const response = await postContactAction(
          formData.phone,
          formData.comment,
          consent,
          formData.honeypot,   // Передаем honeypot
          formLoadTime         // Передаем время загрузки
        );

        if (response.success) {
          setSuccess('Ваш запрос успешно отправлен! Мы свяжемся с вами в ближайшее время.');
          setFormData({
            phone: '',
            comment: '',
            honeypot: ''
          });
          setConsent(false);
        } else {
          setError(response.error || 'Произошла ошибка при отправке');
        }
      } catch (e) {
        setError(
          e instanceof Error
            ? `Произошла ошибка при отправке данных: ${e.message}`
            : 'Неизвестная ошибка. Пожалуйста, попробуйте еще раз.'
        );
      } finally {
        setIsSubmitting(false);
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      viewport={{once: true}}
      className="lg:w-1/2 w-full flex justify-center items-center">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-[360px]">
        <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-mainPurple"></div>

        <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-5 sm:pb-6">
          <p className="text-center mb-4 sm:mb-5 text-sm sm:text-base text-gray-700">
            Предложите нам идею, и мы поможем вам ее реализовать
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            {/* Улучшенное honeypot поле */}
            <input
              type="text"
              name="email" // Более привлекательное для ботов имя
              value={formData.honeypot}
              onChange={handleHoneypotChange}
              style={{
                display: 'none',
                position: 'absolute',
                left: '-9999px'
              }}
              autoComplete="off"
              tabIndex={-1}
            />

            {/* Остальная форма без изменений */}
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
              className='py-4 sm:py-[25px] text-sm sm:text-base'
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

            {success && (
              <p className="text-green-600 text-sm text-center">
                {success}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="py-4 sm:py-[25px] text-sm sm:text-base font-semibold mt-2 bg-mainPurple hover:bg-mainPurple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Рассчитать стоимость'}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}