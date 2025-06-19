'use client'

import { Style } from '@/types'
import { Card, CardHeader } from '@/components/ui/card'
import UpdateStyleContainer from '@/components/admin/styles/UpdateStyleContainer'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function StyleCard({ style, onDeleteAction }: {
  style: Style,
  onDeleteAction: (id: number) => Promise<void>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">{style.style}</p>
        <div>
          <UpdateStyleContainer style={style}/>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteAction(style.id)}
          >
            <Trash2 className="h-4 w-4"/>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
