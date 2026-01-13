import {Service} from "@/types";
import Image from 'next/image'
import Link from "next/link";


export default function ServiceCard({ service }: { service: Service }) {
  const isReversed = service.id % 2 === 0
  return (
    <div
      className={`flex flex-col md:flex-row shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-5xl mx-auto rounded-xl p-6 md:p-[50px] ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full h-56 md:w-[300px] md:h-[300px] flex-shrink-0 relative mb-6 md:mb-0">
        {service.image && (
          <Image
            className="rounded-xl object-cover"
            src={service.image}
            alt={service.title}
            fill={false}
            width={1200}
            height={1200}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
      <div className="flex-1 p-0 md:p-8 flex flex-col justify-center">
        <h3 className="font-extrabold text-xl md:text-2xl mb-2">{service.title}</h3>
        <p className="text-base mb-2">{service.description}</p>
        {service.link && (
          <Link
            href={service.link}
            className="text-mainPurple underline text-sm mt-2 inline-block"
          >
            Подробнее
          </Link>
        )}
      </div>
    </div>
  )
}