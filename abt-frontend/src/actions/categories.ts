'use server'

import {revalidatePath} from 'next/cache'
import {CategoryData} from '@/types/types'
import {deleteCategory, patchCategory, postCategory} from "@/lib/api/categories"
import {ADMIN_ROUTES} from "@/config/navigation"

const path = ADMIN_ROUTES.CATEGORIES.path

export async function postCategoryAction(data: CategoryData, token: string) {
    await postCategory(data, token)
    revalidatePath(path)
}

export async function deleteCategoryAction(id: number, token: string) {
    await deleteCategory(id, token)
    revalidatePath(path)
}

export async function patchCategoryAction(id: number, data: CategoryData, token: string) {
    await patchCategory(id, data, token)
    revalidatePath(path)
}