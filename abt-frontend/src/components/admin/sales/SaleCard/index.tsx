'use client'

import { Sale } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import UpdateSaleContainer from '@/components/admin/sales/UpdateSaleContainer'
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function SaleCard({
  sale,
  onDeleteAction,
}: {
  sale: Sale;
  onDeleteAction: (id: string, token: string) => Promise<void>;
}) {
  const handleDelete = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        alert('Вы не авторизованы')
        return
      }
      await onDeleteAction(sale.id, token)
    } catch (error) {
      console.error('Ошибка при удалении акции:', error)
    }
  }

  return (
    <Card className="rounded-xl shadow-lg border-0 bg-white/90">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <h1 className="font-bold text-lg md:text-xl m-0 p-0">
            {sale.title}
          </h1>
          <div className="flex gap-1">
            <UpdateSaleContainer sale={sale}/>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="hover:bg-mainPurple text-black hover:text-white transition-colors"
              aria-label="Удалить акцию"
            >
              <Trash2 className="h-4 w-4"/>
            </Button>
          </div>
        </div>
        <p className="text-gray-500 text-sm md:text-base m-0 p-0">
          {sale.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {sale.photo && (
            <div className="w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
              <Image
                src={sale.photo}
                alt={sale.title}
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
            </div>
          )}
          {sale.link && (
            <a
              href={sale.link}
              className="text-mainPurple font-semibold underline underline-offset-2 hover:text-mainPurple/80 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {sale.link}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
