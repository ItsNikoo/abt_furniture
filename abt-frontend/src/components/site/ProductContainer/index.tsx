import { Product } from '@/types'
import ProductPhotoCarousel from '@/components/ui/Embla/ProductPhotoCarousel'
import ProductOrderContainer from '@/components/site/Orders/ProductOrderContainer'

export default function ProductContainer({ product }: { product: Product }) {
  return (
    <div className="flex gap-5 mt-10">
      <div className={'w-1/2'}>
        {product.photos && <ProductPhotoCarousel photos={product.photos}/>}
      </div>
      <div className="flex flex-col justify-center gap-5 w-1/2">
        <div>
          <p className="text-gray-400 font-medium">{product.category}</p>
          <h1 className="text-5xl font-bold">{product.title}</h1>
          <ProductOrderContainer product={product}/>
        </div>
        <div className={'flex gap-1'}>
          <p className={'text-gray-400'}>Цена за погонный метр - </p>
          <p>{product.price} руб.</p>
        </div>
        <div>
          <h1 className={'text-gray-400'}>{product.description}</h1>
        </div>
        <div className="border-t border-b border-gray-200 py-4 w-1/2">
          <div className="flex">
            <div className="w-1/2">
              <p className="text-gray-500">Материал</p>
              <p className="text-gray-500">Стиль</p>
            </div>
            <div className="w-1/2">
              <p className="font-medium">{product.material || 'Не указано'}</p>
              <p className="font-medium">{product.style || 'Не указано'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
