import RightPartOfFirstPage from '@/components/site/FirstPage/RightPartOfFirstPage'
import LeftPartOfFirstPage from '@/components/site/FirstPage/LeftPartOfFirstPage'
import styles from './FirstPage.module.css'
import ClientContainer from '@/components/site/FirstPage/ClientContainer'

export default function FirstPage() {
  return (
    <div className="relative px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 z-10 flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 -z-10"
        style={{backgroundImage: "url('/background_image.webp')"}}
      />
      <div className='flex lg:flex-row flex-col justify-center items-center'>
        <LeftPartOfFirstPage/>
        <RightPartOfFirstPage/>
      </div>
      <div className='relative w-full z-10 hidden lg:block'>
        {/* Новый блок на всю ширину */}
        <ClientContainer/>
      </div>
    </div>
  )
}