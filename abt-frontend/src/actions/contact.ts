'use server'

import {postContact} from "@/lib/api/contact";

export async function postContactAction(phone: string, comment: string, consent: boolean, product?: string) {
  try {
    await postContact({ phone, comment, consent, product })
  } catch (error) {
    console.error("Ошибка в postContactAction:", error)
    return { success: false, error: error instanceof Error ? error.message : "Неизвестная ошибка" }
  }
}