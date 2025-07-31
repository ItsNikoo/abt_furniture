'use client'

import { use } from 'react'
import { Material } from '@/types'
import MaterialCard from '@/components/admin/materials/MaterialCard'
import { deleteMaterialAction } from '@/actions/materials'

export default function MaterialsBar({ promise }: { promise: Promise<Material[]> }) {
  const materials = use(promise)

  const handleDeleteMaterial = async (id: number, token: string) => {
    await deleteMaterialAction(id, token)
    // Тут можешь обновить локальное состояние после удаления
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5">
        {materials?.map((material: Material) => (
          <MaterialCard key={material.id} material={material} onDeleteAction={handleDeleteMaterial} />
        ))}
      </div>
    </div>
  )

}
