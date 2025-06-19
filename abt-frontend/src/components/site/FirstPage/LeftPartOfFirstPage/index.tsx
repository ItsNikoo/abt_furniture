import styles from './LeftPartOfFirstPage.module.css'
import { advantagesList } from '@/lib/advantages-list'
import Image from 'next/image'

interface Advantage {
  title: string;
  icon: string;
}

export default function LeftPartOfFirstPage() {
  return (
    <div className={styles.Content}>
      <h1 className="font-overpass font-extrabold text-6xl">ДЕЛАЕМ МЕБЕЛЬ С ДУШОЙ — КАК ДЛЯ СВОЕГО ДОМА</h1>
      <p className="text-xl">Мы не просто производим мебель — мы создаем уютные пространства, в которых хочется
        жить.</p>
      <p className="text-xl">Мы воплощаем вашу идею в реальность и сопровождаем вас на каждом этапе: начиная от
        замера и заканчивая установкой</p>
      <div className="grid grid-cols-2">
        {advantagesList.map((advantage: Advantage, index) => (
          <div key={index} className="flex items-center gap-3 py-3 pr-5">
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
            <p className="text-base">{advantage.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
