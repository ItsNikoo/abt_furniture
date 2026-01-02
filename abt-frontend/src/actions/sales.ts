'use server'

import { deleteSale as deleteSaleApi, patchSale as patchSaleApi, postSale as postSaleApi } from '@/lib/api/sales'
import { revalidatePath } from 'next/cache'
import { SaleData } from '@/types'
import {ADMIN_ROUTES} from "@/config/navigation";

const path = ADMIN_ROUTES.SALES.path

// Удаление
export async function deleteSaleAction(id: string, token: string) {
  await deleteSaleApi(id, token)
  revalidatePath(path)
}

// Обновление
export async function patchSaleAction(id: string, data: SaleData, token: string) {
  await patchSaleApi(id, data, token)
  revalidatePath(path)
}

// Создание
export async function postSaleAction(data: SaleData, token: string) {
  await postSaleApi(data, token)
  revalidatePath(path)
}
