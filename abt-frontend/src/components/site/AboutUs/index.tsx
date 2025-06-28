import styles from "@/components/site/Services/ServicesPage.module.css";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className={styles.Container}>
      <div>
        <h1 className='text-mainPurple font-extrabold font-overpass text-4xl mb-3'>Наша история – качество с 2002
          года</h1>
        <p className='text-[18px]'>Мы – производитель а не посредник. И вся наша философия построена вокруг создания
          уникального продукта, который будет ценным для покупателя и решит его проблемы.</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-bold font-overpass text-2xl mb-3'>От маленькой мастерской – к
          современному производству</h3>
        <p className='text-[18px]'>Наша история начиналась с небольшой компании, где каждый предмет мебели создавался с
          особым вниманием к деталям. В 2002 году мы сделали первый шаг – и с тех пор неустанно развиваемся, сохраняя
          любовь к клиентам и внедряя передовые технологии.</p>
        <p className='text-[18px]'>Сегодня мы – это собственное производство,
          оснащенное высокоточным оборудованием, и команда профессионалов, которые превращают дерево и металл в стильную и
          функциональную мебель.</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-bold font-overpass text-2xl mb-3'>Наши принципы</h3>
        <p className='text-[18px]'><span className='font-bold'>Качество без компромиссов</span> – используем только
          проверенные материалы и фурнитуру.</p>
        <p className='text-[18px]'><span className='font-bold'>Индивидуальный подход</span> – создаем мебель под Ваши
          потребности и вкус.</p>
        <p className='text-[18px]'><span className='font-bold'>Надежность</span> – более 20 лет на рынке и доверие тысяч
          клиентов.</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-bold font-overpass text-2xl mb-3'>Партнерство и развитие</h3>
        <p className='text-[18px]'>Мы гордимся сотрудничеством с ведущими поставщиками и дизайнерами. Наши партнеры –
          это компании, которые, как и мы, ценят экологичность, инновации и безупречный сервис.</p>
        <p className='text-[18px]'>Мы всегда открыты к сотрудничеству. <Link href='/contacts'
                                                                             className='text-mainPurple underline'>Напишите
          нам.</Link></p>
      </div>
      <div>
        <p className='text-[18px] mb-3'>Каждый наш проект – это не просто изделие, а часть вашего дома, созданная с душой. Мы
          продолжаем расти, чтобы предлагать вам лучшие решения для уюта и комфорта.</p>
        <h3 className='text-mainPurple font-bold font-overpass text-2xl mb-3'>Спасибо, что выбираете нас!</h3>
      </div>
    </div>
  )
}