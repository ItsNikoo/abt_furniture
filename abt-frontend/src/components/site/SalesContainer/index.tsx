'use client'

import { useEffect, useState } from 'react'
import { Sale } from '@/types'
import SalesPlaceholder from '@/components/placeholders/SalesPlaceholder'
import { fetchSales } from "@/lib/api/sales"
import SalesCarousel from "@/components/ui/Embla/SalesCarousel"

export default function SalesContainer() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSales() // ← Используйте вашу функцию
        console.log('API Response:', data)
        setSales(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить акции')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return (
    <div className="mt-5">
      <SalesPlaceholder/>
    </div>
  )

  if (error || sales.length === 0) return (
    <div className="mt-5">
      <SalesPlaceholder/>
    </div>
  )

  return (
    <div className="mt-5">
      <SalesCarousel slides={sales}/>
    </div>
  )
}