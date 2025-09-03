import { advantagesList } from '@/lib/advantages-list'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedText from '@/components/ui/Animations/AnimatedText'

interface Advantage {
  title: string;
  icon: string;
}

export default function LeftPartOfFirstPage() {
  return (
    <div className="relative lg:w-2/3 sm:pt-20 py-10 ">
      <AnimatedText
        text={'ДЕЛАЕМ МЕБЕЛЬ С ДУШОЙ — КАК ДЛЯ СВОЕГО ДОМА'}
        className="font-black sm:text-6xl mb-3 text-4xl "
      />
      <motion.div
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.75 }}>
        <p className="sm:text-xl mb-2">Мы не просто производим мебель — мы создаем уютные пространства, в которых
          хочется
          жить.</p>
        <p className="sm:text-xl mb-2">Мы воплощаем вашу идею в реальность и сопровождаем вас на каждом этапе: начиная
          от
          замера и заканчивая установкой</p>
      </motion.div>
      <div className="sm:grid sm:grid-cols-2 flex flex-col gap-3 mt-10">
        {advantagesList.map((advantage: Advantage, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index} className="flex items-center gap-3 py-3 pr-5">
            <div
              className="w-[50px] h-[50px] flex-shrink-0 bg-mainPurple rounded-full flex items-center justify-center">
              <Image
                src={`/advantages/${advantage.icon}.svg`}
                width={24}
                height={24}
                alt={advantage.title}
                className="text-white"
              />
            </div>
            <p className="sm:text-base text-sm">{advantage.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
