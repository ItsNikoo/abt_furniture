import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function SalesPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mb-5"
    >
      <div className="embla">
        <div className="embla__viewport overflow-hidden my-3 sm:my-5 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl">
          <div className="embla__container flex">
            <div className="embla__slide flex-[0_0_100%] min-w-0">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 flex flex-col items-center justify-between pt-3 sm:pt-5 pb-5 sm:pb-10 px-2 sm:px-3">
                  <Skeleton className="h-10 w-3/4 mb-4" />
                  <div className="flex flex-col items-center mt-4 sm:mt-0">
                    <div className="rounded-full bg-mainPurple p-2 w-10 h-10 flex items-center justify-center mb-2">
                      <Image
                        src="/star.svg"
                        alt="Star icon"
                        width={32}
                        height={32}
                        className="opacity-40"
                      />
                    </div>
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>
                </div>
                <div className="w-full sm:w-1/2 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-gray-200 flex items-center justify-center">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Точки навигации */}
        <div className="mt-2 sm:mt-4 flex justify-center gap-1">
          {[...Array(3)].map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === 0 ? "bg-mainPurple" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Кнопки навигации */}
      <button
        className="hidden sm:flex absolute left-[-30px] lg:left-[-50px] top-1/2 -translate-y-1/2 bg-mainPurple p-2 w-8 h-8 lg:w-10 lg:h-10 items-center justify-center shadow-lg opacity-50 cursor-not-allowed"
        aria-label="Предыдущий слайд"
        disabled
      >
        {/* Иконка стрелки влево */}
        <svg width="24" height="24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className="hidden sm:flex absolute right-[-30px] lg:right-[-50px] top-1/2 -translate-y-1/2 bg-mainPurple p-2 w-8 h-8 lg:w-10 lg:h-10 items-center justify-center shadow-lg opacity-50 cursor-not-allowed"
        aria-label="Следующий слайд"
        disabled
      >
        {/* Иконка стрелки вправо */}
        <svg width="24" height="24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </motion.div>
  );
}

