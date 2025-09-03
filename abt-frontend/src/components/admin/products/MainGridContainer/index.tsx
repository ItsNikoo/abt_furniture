'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/api/products'
import { Product } from '@/types'
import ProductCard from '@/components/admin/products/ProductCard'
import { useState } from 'react'

export default function MainGridContainer() {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchProducts(),
    queryKey: ['products'],
    refetchInterval: 1000,
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-500">Загрузка...</div>
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-lg text-red-500">Что-то пошло не так</div>
  }

  const filtered = data.filter((product: Product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-mainPurple text-base"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((product: Product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </div>
  )
}
