'use server'

import { deleteSale as deleteSaleApi, patchSale as patchSaleApi, postSale as postSaleApi } from '@/lib/api/sales'
import { revalidatePath } from 'next/cache'
import { SaleData } from '@/types'

// Удаление
export async function deleteSaleAction(id: string) {
  await deleteSaleApi(id)
  revalidatePath('/admin/sales')
}

// Обновление
export async function patchSaleAction(id: string, data: SaleData) {
  await patchSaleApi(id, data)
  revalidatePath('/admin/sales')
}

// Создание
export async function postSaleAction(data: SaleData) {
  await postSaleApi(data)
  revalidatePath('/admin/sales')
}
