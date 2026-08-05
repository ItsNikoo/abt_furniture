'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ServiceProps {
  title: string;
  link: string;
}

interface ServiceButtonProps {
  onNavigate?: () => void;
}

const services: ServiceProps[] = [
  {
    title: 'Дизайн-проект',
    link: '/services/design',
  },
  {
    title: 'Замер',
    link: '/services/measure',
  },
  {
    title: 'Доставка',
    link: '/services/delivery',
  },
  {
    title: 'Установка',
    link: '/services/setup',
  },
]

export default function ServiceButton({ onNavigate }: ServiceButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeMenu = () => {
    setIsOpen(false)
    onNavigate?.()
  }

  return (
    <div
      className="relative z-[70] inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        const nextFocusedElement = event.relatedTarget

        if (!(nextFocusedElement instanceof Node) || !event.currentTarget.contains(nextFocusedElement)) {
          setIsOpen(false)
        }
      }}
    >
      <Link
        className="font-notosans"
        href="/services"
        onClick={closeMenu}
      >
        Услуги
      </Link>
      {isOpen && (
        <div className="hidden min-w-[220px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md lg:absolute lg:left-0 lg:top-full lg:z-[80] lg:mt-0 lg:block">
          {services.map((service: ServiceProps) => (
            <Link
              key={service.link}
              href={service.link}
              onClick={closeMenu}
              className="font-notosans block px-4 py-3 text-sm text-gray-900 transition-colors duration-200 hover:bg-mainPurple hover:text-white focus:bg-mainPurple focus:text-white focus:outline-none"
            >
              {service.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
