'use client'

import { Style } from '@/types'
import { use } from 'react'
import StyleCard from '@/components/admin/styles/StyleCard'
import { deleteStyleAction } from '@/actions/styles'

export default function StylesBar({ promise }: { promise: Promise<Style[]> }) {
  const styles = use(promise)

  const handleDeleteStyle = async (id: number, token: string) => {
    await deleteStyleAction(id, token)
  }

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {styles?.map((style) => (
        <div key={style.id}>
          <StyleCard style={style} onDeleteAction={handleDeleteStyle}/>
        </div>
      ))}
    </div>
  )
}
