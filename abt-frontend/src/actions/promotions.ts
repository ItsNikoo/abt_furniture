'use server'

import {ADMIN_ROUTES} from "@/config/navigation"
import {revalidatePath} from "next/cache"
import {deletePromotion, patchPromotion, postPromotion} from "@/lib/api/promotions"
import {PromotionData} from "@/types"

const path = ADMIN_ROUTES.PROMOTIONS.path

export async function postPromotionAction(data: PromotionData, token: string) {
  await postPromotion(data, token)
  revalidatePath(path)
}

export async function patchPromotionAction(id: number, data: PromotionData, token: string) {
  await patchPromotion(id, data, token)
  revalidatePath(path)
}

export async function deletePromotionAction(id: number, token: string) {
  await deletePromotion(id, token)
  revalidatePath(path)
}