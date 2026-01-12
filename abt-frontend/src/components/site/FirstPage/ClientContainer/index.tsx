'use client'

import { advantagesList } from "@/lib/advantages-list"
import { motion } from "framer-motion"
import Image from "next/image"

interface Advantage {
    title: string
    icon: string
}

export default function ClientContainer() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-4 sm:px-6 lg:px-0">
          {advantagesList.map((advantage: Advantage, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center
              text-center p-6 bg-white rounded-t-2xl
              hover:border-mainPurple border-white border-t-4
              transition-all duration-300"
            >
                <div className="bg-mainPurple rounded-full p-2 mb-2 flex items-center justify-center">
                    <Image
                      src={`/advantages/${advantage.icon}.svg`}
                      width={40}
                      height={40}
                      alt={advantage.title}
                    />
                </div>
                <p className="text-sm sm:text-base font-medium leading-tight
                  transition-all duration-300">
                    {advantage.title}
                </p>
            </motion.div>
          ))}
      </div>
    )
}
