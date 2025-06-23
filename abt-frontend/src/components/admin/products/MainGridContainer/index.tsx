'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/api/products'
import { Product } from '@/types'
import ProductCard from '@/components/admin/products/ProductCard'

export default function MainGridContainer() {
  const { data, isLoading, isError } = useQuery({
    queryFn: fetchProducts,
    queryKey: ['products'],
    refetchInterval: 1000,
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-500">Загрузка...</div>
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-lg text-red-500">Что-то пошло не
      так</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product: Product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </div>
  )
}
