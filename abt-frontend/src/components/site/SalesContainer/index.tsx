'use client'

import { useEffect, useState } from 'react'
import { Sale } from '@/types'
import FirstCarousel from '@/components/ui/Embla/FirstCarousel'
import LoadingPlaceholder from "@/components/placeholders/LoadingPlaceholder";
import SalesPlaceholder from "@/components/placeholders/SalesPlaceholder";

export default function SalesContainer() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sales') // ← Используй Next.js API route
        if (!response.ok) throw new Error('Невозможно получить акции')
        const data = await response.json()
        setSales(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return (
    <div>
      <LoadingPlaceholder />
    </div>
  )
  if (error || sales.length === 0) return (
    <div>
      <SalesPlaceholder />
    </div>
  )

  return (
    <div className="mt-10 mb-5">
      <FirstCarousel slides={sales}/>
    </div>
  )
}