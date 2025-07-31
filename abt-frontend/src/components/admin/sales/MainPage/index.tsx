'use client'

import { Sale } from '@/types'
import { use } from 'react'
import SaleCard from '@/components/admin/sales/SaleCard'
import { deleteSaleAction } from '@/actions/sales'

export default function MainPage({ promise }: { promise: Promise<Sale[]> }) {
  const sales = use(promise)

  const handleDelete = async (id: string, token: string) => {
    try {
      await deleteSaleAction(id, token)
    } catch (error) {
      console.error('Ошибка при удалении акции:', error)
      throw error
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
