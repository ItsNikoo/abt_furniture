'use client'

import { Category } from '@/types'
import { use } from 'react'
import CategoryCard from '@/components/admin/categories/CategoryCard'
import { deleteCategoryAction } from '@/actions/categories'

export default function CategoriesBar({ promise }: { promise: Promise<Category[]> }) {
  const data = use(promise)
  return (
    <div>
      <div className={'grid grid-cols-3 gap-4'}>
        {data?.map((category: Category) => (
          <CategoryCard key={category.id} category={category} onDeleteAction={deleteCategoryAction}/>
        ))}
      </div>
    </div>
  )

}
