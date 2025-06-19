import { Sale } from '@/types'
import { use } from 'react'
import FirstCarousel from '@/components/ui/Embla/FirstCarousel'

export default function SalesContainer({ promise }: { promise: Promise<Sale[]> }) {
  const sales = use(promise)

  return (
    <div className="mt-10 mb-5">
      <FirstCarousel slides={sales}/>
    </div>
  )
}
