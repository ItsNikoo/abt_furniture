'use server'

import { deleteMaterial, patchMaterial, postMaterial } from '@/lib/api/materials'
import { revalidatePath } from 'next/cache'
import {ADMIN_ROUTES} from "@/config/navigation"

const path = ADMIN_ROUTES.MATERIALS.path

// Удаление материала
export async function deleteMaterialAction(id: number, token: string) {
  await deleteMaterial(id, token)
  revalidatePath(path)
}

// Обновление материала
export async function patchMaterialAction(id: number, data: string, token: string) {
  await patchMaterial(id, data, token)
  revalidatePath(path)
}

// Создание материала
export async function postMaterialAction(material: string, token: string) {
  await postMaterial(material, token)
  revalidatePath(path)
}
