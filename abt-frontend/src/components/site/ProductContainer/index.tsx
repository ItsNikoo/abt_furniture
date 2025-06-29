import { Product } from '@/types'
import ProductPhotoCarousel from '@/components/ui/Embla/ProductPhotoCarousel'
import ProductOrderContainer from '@/components/site/Orders/ProductOrderContainer'

export default function ProductContainer({ product }: { product: Product }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 mt-5 sm:mt-10">
      <div className={'w-full lg:w-1/2'}>
        {product.photos && <ProductPhotoCarousel photos={product.photos}/>}
      </div>
      <div className="flex flex-col justify-center gap-3 sm:gap-5 w-full lg:w-1/2">
        <div>
          <p className="text-gray-400 font-medium text-sm sm:text-base">{product.category}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{product.title}</h1>
          <ProductOrderContainer product={product}/>
        </div>
        <div className={'flex flex-wrap gap-1'}>
          <p className={'text-gray-400 text-sm sm:text-base'}>Цена за погонный метр - </p>
          <p className="text-sm sm:text-base">{product.price} руб.</p>
        </div>
        <div>
          <h1 className={'text-gray-400 text-sm sm:text-base'}>{product.description}</h1>
        </div>
        <div className="border-t border-b border-gray-200 py-3 sm:py-4 w-full sm:w-3/4 lg:w-1/2">
          <div className="flex">
            <div className="w-1/2">
              <p className="text-gray-500 text-sm sm:text-base">Материал</p>
              <p className="text-gray-500 text-sm sm:text-base">Стиль</p>
            </div>
            <div className="w-1/2">
              <p className="font-medium text-sm sm:text-base">{product.material || 'Не указано'}</p>
              <p className="font-medium text-sm sm:text-base">{product.style || 'Не указано'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
