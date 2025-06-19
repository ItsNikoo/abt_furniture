'use server'

import { deleteMaterial, patchMaterial, postMaterial } from '@/lib/api/materials'
import { revalidatePath } from 'next/cache'

// Удаление материала
export async function deleteMaterialAction(id: number) {
  await deleteMaterial(id)
  revalidatePath('/admin/sales')
}

// Обновление материала
export async function patchMaterialAction(id: number, data: string) {
  await patchMaterial(id, data)
  revalidatePath('/admin/sales')
}

// Создание материала
export async function postMaterialAction(material: string) {
  await postMaterial(material)
  revalidatePath('/admin/sales')
}
