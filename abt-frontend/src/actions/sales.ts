'use server'

import { deleteSale as deleteSaleApi, patchSale as patchSaleApi, postSale as postSaleApi } from '@/lib/api/sales'
import { revalidatePath } from 'next/cache'
import { SaleData } from '@/types'

// Удаление
export async function deleteSaleAction(id: string, token: string) {
  await deleteSaleApi(id, token)
  revalidatePath('/admin/sales')
}

// Обновление
export async function patchSaleAction(id: string, data: SaleData, token: string) {
  await patchSaleApi(id, data, token)
  revalidatePath('/admin/sales')
}

// Создание
export async function postSaleAction(data: SaleData, token: string) {
  await postSaleApi(data, token)
  revalidatePath('/admin/sales')
}
