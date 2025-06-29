'use client'

import { useState } from "react";
import Link from "next/link";

interface ServiceProps{
  title: string;
  link: string;
}

const services: ServiceProps[] = [
  {
    title:"Дизайн проект",
    link:"/services/design",
  },
  {
    title:"Замер",
    link:"/services/measure",
  },
  {
    title:"Доставка",
    link:"/services/delivery",
  },
  {
    title:"Установка",
    link:"/services/setup",
  }
];

export default function ServiceButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        className="font-semibold font-overpass"
        href='/services'
      >
        Услуги
      </Link>
      {isOpen && (
        <div
          className="absolute top-full left-0 bg-white shadow-lg rounded-md min-w-[150px] z-10 transform transition-all duration-300 opacity-0 translate-y-2 pointer-events-none data-[open=true]:opacity-100 data-[open=true]:translate-y-0 data-[open=true]:pointer-events-auto pt-2"
          data-open={isOpen}
        >
          {services.map((service: ServiceProps, index) => (
            <Link
              key={index}
              href={service.link}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-300 font-overpass"
            >
              {service.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}