import { motion } from 'framer-motion'

export default function LeftPartOfFirstPage() {
  return (
    <div className="relative flex items-center justify-center pt-40 w-full">
      <div className="z-10 text-center max-w-3xl px-4">
        <motion.h1 className="text-3xl sm:text-5xl font-extrabold">
          Производитель корпусной мебели в Москве
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.8 }}
        >
          <p className="text-base sm:text-xl mb-3 mt-6">
            Мы не просто производим мебель — мы создаем уютные пространства, в которых хочется жить.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
