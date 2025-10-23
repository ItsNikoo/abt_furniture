import {motion} from 'framer-motion'
import AnimatedText from '@/components/ui/Animations/AnimatedText'

export default function LeftPartOfFirstPage() {
  return (
    <div className="relative lg:w-2/3  px-10 flex flex-col justify-center">
      <AnimatedText
        text={'ДЕЛАЕМ МЕБЕЛЬ С ДУШОЙ — КАК ДЛЯ СВОЕГО ДОМА'}
        className="font-black sm:text-5xl mb-3 text-4xl "
      />
      <motion.div
        initial={{y: 20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.75, delay: 1}}>
        <p className="sm:text-xl mb-2">Мы не просто производим мебель — мы создаем уютные пространства, в которых
          хочется
          жить.</p>
        <p className="sm:text-xl mb-2">Мы воплощаем вашу идею в реальность и сопровождаем вас на каждом этапе: начиная
          от
          замера и заканчивая установкой</p>
      </motion.div>
    </div>
  )
}
