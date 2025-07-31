'use server'

import { deleteCategory, patchCategory, postCategory } from '@/lib/api/categories'
import { revalidatePath } from 'next/cache'
import { CategoryData } from '@/types'

export async function deleteCategoryAction(id: number, token: string) {
  await deleteCategory(id, token)
  revalidatePath('admin/categories/')
}

export async function patchCategoryAction(id: number, data: CategoryData, token: string) {
  await patchCategory(id, data, token)
  revalidatePath('admin/categories/')
}

export async function postCategoryAction(data: CategoryData, token: string) {
  await postCategory(data, token)
  revalidatePath('admin/categories/')
}
