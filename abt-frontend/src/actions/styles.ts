'use server'

import { deleteStyle, patchStyle, postStyle } from '@/lib/api/styles'
import { revalidatePath } from 'next/cache'
import {ADMIN_ROUTES} from "@/config/navigation";

const path = ADMIN_ROUTES.STYLES.path

export async function deleteStyleAction(id: number, token: string) {
  await deleteStyle(id, token)
  revalidatePath(path)
}

export async function postStyleAction(style: string, token: string) {
  await postStyle(style, token)
  revalidatePath(path)
}

export async function patchStyleAction(id: number, style: string, token: string) {
  await patchStyle(id, style, token)
  revalidatePath(path)
}
