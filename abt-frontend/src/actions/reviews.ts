'use server'

import {ADMIN_ROUTES} from "@/config/navigation";
import {ReviewData} from "@/types";
import {deleteReview, patchReview, postReview} from "@/lib/api/reviews";
import {revalidatePath} from "next/cache";

const path = ADMIN_ROUTES.REVIEWS.path

export async function postReviewAction(data: ReviewData, token: string) {
  await postReview(data, token)
  revalidatePath(path)
}

export async function patchReviewAction(id: number, data: ReviewData, token: string) {
  await patchReview(id, data, token)
  revalidatePath(path)
}

export async function deleteReviewAction(id: number, token: string) {
  await deleteReview(id, token)
  revalidatePath(path)
}