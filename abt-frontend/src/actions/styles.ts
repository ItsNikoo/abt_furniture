'use server'

import { deleteStyle, patchStyle, postStyle } from '@/lib/api/styles'
import { revalidatePath } from 'next/cache'

export async function deleteStyleAction(id: number, token: string) {
  await deleteStyle(id, token)
  revalidatePath(`/admin/styles`)
}

export async function postStyleAction(style: string, token: string) {
  await postStyle(style, token)
  revalidatePath(`/admin/styles`)
}

export async function patchStyleAction(id: number, style: string, token: string) {
  await patchStyle(id, style, token)
  revalidatePath(`/admin/styles`)
}
