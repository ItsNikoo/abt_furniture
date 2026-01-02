'use server'

import {ADMIN_ROUTES} from "@/config/navigation";
import {revalidatePath} from "next/cache";
import {postPromotion} from "@/lib/api/promotions";

const path = ADMIN_ROUTES.PROMOTIONS.path

export async function postPromotionAction(formData: FormData, token: string) {
  await postPromotion(formData, token)
  revalidatePath(path)
}