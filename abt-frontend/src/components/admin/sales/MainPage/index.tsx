'use client'

import { Sale } from '@/types'
import { use } from 'react'
import SaleCard from '@/components/admin/sales/SaleCard'
import { deleteSaleAction } from '@/actions/sales'
import Cookies from 'js-cookie'

export default function MainPage({ promise }: { promise: Promise<Sale[]> }) {
  const sales = use(promise)

  async function handleDelete(id: string) {
    const token = Cookies.get('token')
    if (!token) {
      alert('Вы не авторизованы')
      return
    }

    try {
      await deleteSaleAction(id, token)
    } catch (error) {
      console.error('Ошибка при удалении акции:', error)
      alert('Не удалось удалить акцию')
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {sales.map((sale) => (
        <div key={sale.id}>
          <SaleCard sale={sale} onDeleteAction={handleDelete} />
        </div>
      ))}
    </div>
  )
}