'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sale } from '@/types'
import { deleteSaleAction } from '@/actions/sales' // предполагаю, что у тебя есть такая action
import Cookies from 'js-cookie'
import UpdateSaleContainer from '@/components/admin/sales/UpdateSaleContainer'
import { useState } from 'react'

interface Props {
  sale: Sale
}

export default function SaleCard({ sale }: Props) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  const mainPhoto = sale.photo || sale.mobilePhoto || null

  const thumbnailPhoto = sale.photo && sale.mobilePhoto ? sale.mobilePhoto : null

  async function handleDelete() {
    const token = Cookies.get('token')
    if (!token) {
      alert('Вы не авторизованы')
      return
    }

    try {
      await deleteSaleAction(sale.id, token)
    } catch (error) {
      console.error('Ошибка при удалении акции:', error)
      alert('Не удалось удалить акцию')
    }
  }

  return (
    <>
      <Card className="overflow-hidden transition-shadow ">
        {/* Главное изображение */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          {mainPhoto ? (
            <Image
              src={mainPhoto}
              alt={sale.description || 'Акция'}
              fill
              className="object-cover transition-transform duration-500 "
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-gray-400 text-sm">Нет изображения</span>
            </div>
          )}

          {sale.mobilePhoto && sale.photo && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
              Адаптивные фото
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex flex-col">
            <CardTitle className="line-clamp-2 text-lg leading-tight">
              {sale.description || 'Без описания'}
            </CardTitle>

            {sale.link && (
              <a
                href={sale.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium mt-2 hover:underline"
              >
                Ссылка
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setShowUpdateDialog(true)}>
              Изменить
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Удалить
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {thumbnailPhoto && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Мобильная версия:</p>
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={thumbnailPhoto}
                  alt="Мобильное фото"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {(sale.photo || sale.mobilePhoto) && (
            <p className="text-xs text-muted-foreground">
              Фото: {sale.photo ? 1 : 0} (десктоп) + {sale.mobilePhoto ? 1 : 0} (мобильное)
            </p>
          )}
        </CardContent>
      </Card>

      {showUpdateDialog && (
        <UpdateSaleContainer
          sale={sale}
          isOpen={showUpdateDialog}
          onCloseAction={() => setShowUpdateDialog(false)}
        />
      )}
    </>
  )
}