import { use } from 'react'
import { Material } from '@/types'
import MaterialCard from '@/components/admin/materials/MaterialCard'
import { deleteMaterialAction } from '@/actions/materials'

export default function MaterialsBar({ promise }: { promise: Promise<Material[]> }) {
  const materials = use(promise)
  return (
    <div>
      <div className="grid grid-cols-5 gap-2.5">
        {materials?.map((material: Material) => (
          <MaterialCard key={material.id} material={material} onDeleteAction={deleteMaterialAction}/>
        ))}
      </div>
    </div>
  )

}
