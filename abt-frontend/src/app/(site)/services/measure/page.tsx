import styles from "@/components/site/Services/ServicesPage.module.css";
import Link from "next/link";

export default function MeasurePage() {
  return (
    <div className={styles.Container}>
      <div>
        <h1 className='text-mainPurple font-extrabold font-overpass text-4xl mb-3'>Замер помещения</h1>
        <p className='text-[18px] mt-3'>
          Точный замер помещения — отвественный шаг на пути к созданию идеальной мебели на заказ. От
          правильности замеров зависит не только внешний вид будущей кухни или гардеробной, но и удобство её
          использования, а также долговечность эксплуатации.
        </p>
      </div>
      <div>
        <h3 className='text-mainPurple font-extrabold font-overpass text-3xl mb-3'>Почему важно доверить замер
          профессионалам?
        </h3>
        <p className='text-[18px] mt-3'>Если вы не уверены в точности собственных замеров, <span className='font-bold'>рекомендуем воспользоваться услугой профессионального
          замера.</span> Наш опытный специалист приедет к вам домой, проведёт все необходимые измерения и учтёт
          особенности
          помещения, чтобы будущая мебель идеально вписалась в ваш интерьер.
        </p>
        <h4 className='text-red-700 font-bold text-xl mt-3'>ВАЖНО!</h4>
        <p className='text-[18px]'>Замер рекомендуется проводить после завершения ремонта и в полностью освобождённом от
          мебели помещении. Это позволит учесть все нюансы и избежать ошибок при проектировании.</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-extrabold font-overpass text-3xl mb-3'>Советы от наших
          специалистов</h3>
        <ul>
          <li>
            <div className='mb-3'>
              <h4 className='text-xl font-semibold'> - Перед началом ремонта</h4>
              <p className='text-[18px]'>Сделайте предварительный замер кухни самостоятельно и обязательно посетите один
                из наших салонов. Это
                поможет вам определиться с размерами и конфигурацией будущей мебели.
              </p>
            </div>
          </li>
          <li>
            <div className='mb-3'>
              <h4 className='text-xl font-semibold'> - Выбор техники</h4>
              <p className='text-[18px]'>Заранее определите, какая бытовая техника будет установлена на вашей кухне. Это
                важно для правильного размещения мебели и коммуникаций.
              </p>
            </div>
          </li>
          <li>
            <div className='mb-3'>
              <h4 className='text-xl font-semibold'> - Стыковка с дизайн-проектом</h4>
              <p className='text-[18px]'>Вместе с нашим дизайнером составьте предварительный <Link href='/services/design' className='text-mainPurple font-bold'>дизайн-проект</Link> кухни или
                предоставьте уже имеющийся. Такой проект понадобится вам для корректного проведения работ по электрике,
                сантехнике и другим коммуникациям.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <p className='text-gray-800'>*Для более детального уточнения перечня услуг и их стоимости рекомендуем связаться с
        нами по телефону.</p>
    </div>
  )
}