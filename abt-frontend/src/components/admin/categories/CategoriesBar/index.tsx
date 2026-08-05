'use client'

import {Category} from '@/types/types'
import {use} from 'react'
import CategoryCard from '@/components/admin/categories/CategoryCard'
import {deleteCategoryAction} from '@/actions/categories'

interface Props {
  promise: Promise<Category[]>
}

export default function CategoriesBar({promise}: Props) {
  const data = use(promise)

  const handleDelete = async (id: number, token: string) => {
    try {
      await deleteCategoryAction(id, token)
    } catch (error) {
      console.error('Ошибка при удалении категории:', error)
    }
  }

  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {data?.map((category: Category) => (
          <CategoryCard key={category.id} category={category} onDeleteAction={handleDelete}/>
        ))}
      </div>
    </div>
  )

}
