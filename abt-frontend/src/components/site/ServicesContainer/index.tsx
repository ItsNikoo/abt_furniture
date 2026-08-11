import Image from "next/image"
import {services} from "@/lib/services"
import Link from "next/link"

interface ServiceProps {
  title: string
  link: string
  image: string
}

export default function ServicesContainer() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto px-4 ">
        <h2 className="text-xl sm:text-3xl font-extrabold text-center md:mb-6 mb-4">Наши услуги</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service: ServiceProps, index) => (
            <Link
              href={service.link}
              key={index}
              className="flex flex-col items-center text-center gap-3 hover:bg-mainPurple transition-all duration-300 hover:text-white p-5"
            >
              <div className="flex h-14 w-14 items-center justify-center bg-mainPurple rounded-lg">
                <Image
                  src={`/services/${service.image}.svg`}
                  alt={service.title}
                  width={32}
                  height={32}
                />
              </div>

              <p className="text-base font-medium">
                {service.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
