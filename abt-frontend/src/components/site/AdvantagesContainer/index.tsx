import Image from "next/image"
import { advantagesList } from "@/lib/advantages-list"

interface Advantage {
  title: string
  icon: string
}

export default function AdvantagesContainer() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto px-4 ">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center md:mb-10 mb-6">Наши преимущества</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantagesList.map((advantage: Advantage, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 hover:bg-mainPurple transition-all duration-300 hover:text-white p-5"
            >
              <div className="flex h-14 w-14 items-center justify-center bg-mainPurple rounded-lg">
                <Image
                  src={`/advantages/${advantage.icon}.svg`}
                  alt={advantage.title}
                  width={32}
                  height={32}
                />
              </div>

              <p className="text-base font-medium">
                {advantage.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
