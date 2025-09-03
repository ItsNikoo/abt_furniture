import MaterialsBar from '@/components/admin/materials/MaterialsBar'
import AddMaterialsContainer from '@/components/admin/materials/AddMaterialsContainer'
import { fetchMaterials } from '@/lib/api/materials'

export const dynamic = 'force-dynamic' // Отключает статическую генерацию
export const revalidate = 0 // Отключает кэширование

export default function MaterialsPage() {
  const materialsPromise = fetchMaterials()
  return (
    <div>
      <AddMaterialsContainer/>
      <MaterialsBar promise={materialsPromise}/>
    </div>
  )
}
