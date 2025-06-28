import styles from "./ServicesPage.module.css"
import Link from "next/link"


export default function Services() {
  return (
    <div className={styles.Container}>
      <div>
        <h1 className='text-mainPurple font-extrabold font-overpass text-4xl mb-3 '>Услуги компании АБТ</h1>
        <p className='text-[18px] mt-3'><span className='font-bold'>Наша компания специализируется на изготовлении корпусной мебели на заказ</span>,
          которая идеально впишется в ваш
          интерьер и подчеркнет индивидуальность вашего пространства. И чтобы облегчить вам задачу,
          <span className='font-bold'> мы предоставляем обширный спектр услуг</span> — от профессионального дизайна до аккуратной установки,
          гарантируя высокое качество и
          долговечность изделий.</p>
      </div>
      <div>
        <Link href='/services/design' className='text-mainPurple font-extrabold text-3xl mb-3'>Разработка дизайн-проекта</Link>
        <p className='text-[18px] mt-3'>Перед началом производства <span className='font-bold'>мы создаем подробный дизайн-проект</span>, учитывая
          все особенности вашего помещения,
          ваши пожелания и стиль интерьера. Наши дизайнеры и проектировщики разрабатывают функциональные и эстетичные
          решения, которые мы визуализируем в объемной модели. <span className='font-bold'>Вы можете выбрать приглянувшиеся модели на нашем
            сайте
            или заказать уникальный проект.</span></p>
      </div>
      <div>
        <Link href='/services/measure' className='text-mainPurple font-extrabold text-3xl mb-3'>Замер помещения</Link>
        <p className='text-[18px] mt-3'>Для точного соответствия мебели вашим размерам <span className='font-bold'>мы отправляем к вам опытного
          замерщика</span>. Он уточняет габариты,
          планировку, наличие труб и коммуникаций и помогает спроектировать мебель в соответствии с планировкой. <span className='font-bold'>Это один из самых ответственных
            этапов</span>,
          так как правильно поставленная мебель повышает комфорт и удобство при проживании.</p>
      </div>
      <div>
        <Link href='/services/delivery' className='text-mainPurple font-extrabold text-3xl mb-3'>Доставка</Link>
        <p className='text-[18px] mt-3'><span className='font-bold'>Мы организуем бережную доставку вашей мебели</span> прямо к вам домой или в
          офис. Все этапы
          логистики тщательно контролируются, чтобы изделия прибыли в идеальном состоянии и в согласованные сроки.</p>
      </div>
      <div>
        <Link href='/services/setup' className='text-mainPurple font-extrabold text-3xl mb-3'>Установка</Link>
        <p className='text-[18px]'><span className='font-bold'>Наши профессиональные сборщики аккуратно и быстро выполняют монтаж мебели</span>, обеспечивая надежность и
          стабильность конструкции. После установки мы проверяем качество сборки и подписываем с вами акт приемки. Вы
          можете быть уверены, что мебель не будет скрипеть или шататься после установки.</p>
      </div>
      <p className='text-gray-800'>*Для более детального уточнения перечня услуг и их стоимости рекомендуем связаться с нами по телефону.</p>
    </div>
  )
}