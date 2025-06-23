import Image from 'next/image'
import Link from 'next/link'
import ContentWrapper from '@/components/ContentWrapper'
import MainOrderContainer from '@/components/site/Orders/MainOrderContainer'

export default function Header() {
  return (
    <ContentWrapper>
      <div className="mt-8 flex flex-row w-full ">
        <Link href="/">
          <Image src="/logo.png" alt="АБТ - мебель для кухни" width={350} height={100}/>
        </Link>
        <div className="flex-1  flex flex-col justify-between my-3">
          <p>Балашиха, Железнодорожный, Керамическая, 2Б | +7 (926) 723-28-80</p>
          <div className="flex flex-row gap-8 ">
            <Link href={'/catalog'} className="font-semibold">Каталог</Link>
            <Link href={'/reviews'} className="font-semibold">Отзывы</Link>
            <Link href={'/contacts'} className="font-semibold">Контакты</Link>
            <Link href={'/about'} className="font-semibold">О компании</Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/*<Button className={styles.OrderButton}>*/}
          {/*    Заказать проект*/}
          {/*</Button>*/}
          <MainOrderContainer/>
        </div>
      </div>
    </ContentWrapper>
  )
}
