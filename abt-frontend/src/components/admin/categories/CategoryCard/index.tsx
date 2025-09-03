'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Category } from '@/types'
import { Trash2 } from 'lucide-react'
import UpdateCategoryContainer from '@/components/admin/categories/UpdateCategoryContainer'
import Cookies from 'js-cookie'

export default function CategoryCard({ category, onDeleteAction }: {
  category: Category,
  onDeleteAction: (id: number, token: string) => Promise<void>,
}) {

  const handleDelete = async () => {
    const token = Cookies.get('token')
    if (token) {
      await onDeleteAction(category.id, token)
    } else {
      console.error('Токен не найден. Пожалуйста, войдите в систему.')
    }
  }

  return (
    <Card className="rounded-xl shadow-lg border-0 bg-white/90">
      <CardHeader className="p-0">
        {category.photo ? (
          <div className="w-full h-44 rounded-t-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <Image
              src={category.photo}
              alt={category.category}
              width={600}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
           <div className="bg-gray-200 w-full h-44 rounded-t-xl"/>
         )}
      </CardHeader>
      <CardContent className="flex flex-row gap-2.5 justify-between items-center py-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">{category.categorySlug}</p>
          <h1 className="text-lg font-bold">{category.category}</h1>
        </div>
        <div className="flex gap-1">
          <UpdateCategoryContainer category={category}/>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="hover:bg-mainPurple text-black hover:text-white"
          >
            <Trash2 className="h-4 w-4 "/>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
