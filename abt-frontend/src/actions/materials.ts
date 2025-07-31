'use server'

import { deleteMaterial, patchMaterial, postMaterial } from '@/lib/api/materials'
import { revalidatePath } from 'next/cache'

// Удаление материала
export async function deleteMaterialAction(id: number, token: string) {
  await deleteMaterial(id, token)
  revalidatePath('/admin/materials')
}

// Обновление материала
export async function patchMaterialAction(id: number, data: string, token: string) {
  await patchMaterial(id, data, token)
  revalidatePath('/admin/materials')
}

// Создание материала
export async function postMaterialAction(material: string,token: string) {
  await postMaterial(material, token)
  revalidatePath('/admin/materials')
}
