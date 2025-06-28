import styles from "@/components/site/Services/ServicesPage.module.css";

export default function Contacts() {
  return (
    <div className={styles.Container}>
      <div>
        <h1 className='text-mainPurple font-extrabold font-overpass text-4xl mb-3'>Контакты нашей
          компании</h1>
        <p className='text-[18px]'>Мы всегда рады помочь Вам создать мебель Вашей мечты! Обращайтесь удобным способом –
          ответим быстро и
          подробно проконсультируем.</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-semibold text-xl mb-2'>Позвоните нам</h3>
        <p className='text-[18px]'><span className='font-bold'>Телефон:</span> +7 (926) 723-28-80 </p>
        <p className='text-[18px]'>Звонки принимаем с 9:00 до 19:00 (без выходных)</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-semibold text-xl mb-2'>Напишите в WhatsApp</h3>
        <p className='text-[18px]'><span className='font-bold'>Телефон:</span> +7 (926) 723-28-80 </p>
        <p className='text-[18px]'>Отправьте фото, эскиз или вопрос – обсудим Ваш проект в чате!</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-semibold text-xl mb-2'>Напишите на почту</h3>
        <p className='text-[18px]'><span className='font-bold'>Email:</span> info@kuhni-abt.ru </p>
        <p className='text-[18px]'>Прикрепляйте планировки, размеры и пожелания – мы подготовим расчет.</p>
      </div>
      <div>
        <h3 className='text-mainPurple font-semibold text-xl mb-2'>Посетите наш шоурум</h3>
        <p className='text-[18px]'><span className='font-bold'>Адрес:</span> Балашиха, Железнодорожный, Керамическая, 2Б
        </p>
        <p className='text-[18px]'><span className='font-bold'>График работы:</span> Пн-Сб, 10:00–19:00</p>
      </div>
      <div>
        <p className='text-[18px]'>Хотите индивидуальный дизайн, замер или консультацию? Оставьте заявку – и мы свяжемся
          с вами в ближайшее время! </p>
        <p className='text-[18px]'>Ваш комфорт – наш приоритет. Ждем Вас! </p>
      </div>
    </div>
  )
}