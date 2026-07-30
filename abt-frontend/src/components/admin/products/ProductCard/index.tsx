import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import {Photo, Product} from '@/types'
import {Button} from '@/components/ui/button'
import Image from 'next/image'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deleteProduct} from '@/lib/api/products'
import Cookies from 'js-cookie'
import {ADMIN_ROUTES} from "@/config/navigation"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
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
      queryClient.invalidateQueries({queryKey: ['products']})
    },
    onError: (err) => {
      console.error('Ошибка при удалении продукта:', err)
      alert('Не удалось удалить продукт')
    },
  })

  const mainPhoto = product.photos && product.photos.length > 0
    ? product.photos[0].photoUrl
    : null

  const thumbnailPhotos = product.photos?.slice(1) || []


  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteMutation.mutate(product.id)
  }

  return (
    <Card className="overflow-hidden ">
      {/* Главное фото */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {mainPhoto ? (
          <Image
            src={mainPhoto}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-gray-400 text-sm">Нет изображения</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3 flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle className="line-clamp-2 text-lg leading-tight">
            {product.title}
          </CardTitle>

          <p className="text-2xl font-bold text-primary mt-3">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>

          <p className="text-sm text-muted-foreground ">
            {product.category}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`${ADMIN_ROUTES.PRODUCTS.path}/${product.id}`}>
            <Button variant="outline">
              Изменить
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>Удалить</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          {product.material && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg">
              {product.material}
            </span>
          )}

          {product.style && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-lg">
              {product.style}
            </span>
          )}
        </div>

        {/* Превью дополнительных фото */}
        {thumbnailPhotos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
            {thumbnailPhotos.map((photo: Photo, index: number) => (
              <div
                key={index}
                className="shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200 bg-gray-50"
              >
                <Image
                  src={photo.photoUrl}  // или photo_url
                  alt={`Доп. фото ${index + 2}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>

  )
}
