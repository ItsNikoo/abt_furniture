'use client'

import { Style } from '@/types'
import { Card, CardHeader } from '@/components/ui/card'
import UpdateStyleContainer from '@/components/admin/styles/UpdateStyleContainer'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Cookies from "js-cookie";

export default function StyleCard({ style, onDeleteAction }: {
  style: Style,
  onDeleteAction: (id: number, token: string) => Promise<void>
}) {

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        alert('Вы не авторизованы')
        return
      }
      await onDeleteAction(style.id, token)
    } catch (error) {
      console.error('Ошибка при удалении материала:', error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">{style.style}</p>
        <div>
          <UpdateStyleContainer style={style}/>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className='hover:bg-mainPurple hover:text-white'
          >
            <Trash2 className="h-4 w-4"/>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
