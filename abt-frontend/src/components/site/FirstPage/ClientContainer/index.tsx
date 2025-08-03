'use client'

import { useState } from 'react'

interface Props {
  id: number
  title: string
  description: string
}

const data = [
  {
    id: 1,
    title: 'Оформление заказа',
    description: 'Оформление заказа занимает всего несколько минут: удобный сайт поможет ознакомиться с ассортиментом и заказать в пару кликов, а наши менеджеры готовы выслушать вас по телефону.',
  },
  {
    id: 2,
    title: 'Подтверждение заказа',
    description: 'Менеджер ответит на все вопросы, уточнит сроки, поможет доукомплектовать заказ при необходимости и подтвердит адрес доставки.',
  },
  {
    id: 3,
    title: 'Комплектация и доставка',
    description: 'Мы собираем ваш заказ с заботой и доставляем прямо до двери — аккуратно и вовремя. Каждый заказ проверяется на комплектность, упаковка надёжная, а доставка — точно в срок.',
  },
  {
    id: 4,
    title: 'Установка и прием результата',
    description: 'Мы предоставляем услуги по установке кухни. Все сделано для того, чтобы вы максимально насладились результатом. Кухня — это сердце дома.',
  },
]

export default function ClientContainer() {
  const [clicked, setClicked] = useState<number | null>(1)

  function handleClick(id: number) {
    setClicked(clicked === id ? null : id)
  }

  return (
    <div className="flex flex-row gap-2 items-start min-h-[320px] pb-[10px]">
      {data.map((item: Props) => {
        const isActive = clicked === item.id
        return (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`
              flex flex-col flex-1 px-[20px] py-[15px] rounded-2xl cursor-pointer
              transition-all duration-300 ease-in-out shadow-md
              ${isActive ? 'bg-mainPurple text-white' : 'bg-white text-black hover:bg-gray-50'}
            `}
            style={{ minHeight: '85px' }} // Фиксированная минимальная высота для всех карточек
          >
            <h2 className="font-montserrat font-bold text-xl">{item.title}</h2>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isActive ? 'max-h-[250px] opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-base leading-relaxed">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}