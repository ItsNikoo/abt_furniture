'use client'

import { Material } from '@/types'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import UpdateMaterialContainer from '@/components/admin/materials/UpdateMaterialContainer'
import Cookies from 'js-cookie'

export default function MaterialCard({
                                       material,
                                       onDeleteAction,
                                     }: {
  material: Material
  onDeleteAction: (id: number, token: string) => Promise<void>
}) {
  const handleDelete = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        alert('Вы не авторизованы')
        return
      }
      await onDeleteAction(material.id, token)
    } catch (error) {
      console.error('Ошибка при удалении материала:', error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">{material.material}</p>
        <div className="flex gap-1">
          <UpdateMaterialContainer material={material} />
          <Button variant="ghost" size="icon" onClick={handleDelete} className='hover:bg-mainPurple hover:text-white'>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
