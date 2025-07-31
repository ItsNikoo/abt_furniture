import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Photo, Product } from '@/types'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '@/lib/api/products'
import Cookies from "js-cookie"
import {Trash2} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Нет токена авторизации. Войдите заново.')
      }
      return deleteProduct(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (err) => {
      console.error('Ошибка при удалении продукта:', err)
      alert('Не удалось удалить продукт')
    },
  })

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteMutation.mutate(product.id)
  }

  return (
    <Card className="rounded-xl shadow-xl border-0 bg-white/90 hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2 rounded-t-xl">
        <div>
          <h1 className="font-bold text-lg md:text-xl mb-1">{product.title}</h1>
          <p className="text-xs text-gray-400 mb-1">{product.productSlug}</p>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className='hover:bg-mainPurple hover:text-white'
          onClick={handleDelete}
          aria-label="Удалить продукт"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Link href={`/admin/products/${product.id}`} key={product.id} className="block hover:no-underline">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {product.photos && product.photos.length > 0 && (
                <div className="flex-shrink-0">
                  <Image
                    src={product.photos[0].photoUrl}
                    width={160}
                    height={160}
                    alt={`${product.title} главное фото`}
                    className="w-40 h-40 object-cover rounded-lg border border-gray-100 bg-gray-50"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-base font-medium mb-1">
                  Цена: <span className="font-semibold">{product.price} ₽</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Материал: <span className="font-semibold">{product.material}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Стиль: <span className="font-semibold">{product.style ?? 'не определен'}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Описание: <span className="font-normal">{product.description}</span>
                </p>
              </div>
            </div>
            {product.photos && product.photos.length > 1 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Доп. фото:</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.photos.slice(1).map((photo: Photo, index) => (
                    <Image
                      key={index}
                      src={photo.photoUrl}
                      width={80}
                      height={80}
                      alt={`${product.title} Фото ${index + 2}`}
                      className="w-20 h-20 object-cover rounded-md border border-gray-100 bg-gray-50"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
