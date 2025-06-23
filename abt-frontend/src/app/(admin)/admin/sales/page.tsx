import { fetchSales } from '@/lib/api/sales'
import MainPage from '@/components/admin/sales/MainPage'
import AddSaleContainer from '@/components/admin/sales/AddSaleContainer'

export default function SalesPage() {
  const salesPromise = fetchSales()
  return (
    <div>
      <AddSaleContainer/>
      <MainPage promise={salesPromise}/>
    </div>
  )
}
