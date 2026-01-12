'use client'

import {Category, Style, Material, Promotion} from "@/types"

interface PromotionsContentProps {
  categories: Category[]
  styles: Style[]
  materials: Material[]
  promotions: Promotion[]
}

export default function PromotionsContent({
                                            categories,
                                            styles,
                                            materials,
                                            promotions,
                                          }: PromotionsContentProps) {

  return (
    <div>
      <pre className="p-4 rounded overflow-auto w-full">
                {JSON.stringify(promotions, null, 2)}
      </pre>

      <details className="mt-8 p-4 bg-gray-100 rounded-lg">
        <summary className="cursor-pointer font-semibold text-gray-700">
          Debug: Данные с бэкенда
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Categories:</h3>
            <pre className="bg-white p-4 rounded overflow-auto max-h-60">
                {JSON.stringify(categories, null, 2)}
              </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Styles:</h3>
            <pre className="bg-white p-4 rounded overflow-auto max-h-60">
                {JSON.stringify(styles, null, 2)}
              </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Materials:</h3>
            <pre className="bg-white p-4 rounded overflow-auto max-h-60">
                {JSON.stringify(materials, null, 2)}
              </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Спецпредложения:</h3>
            <pre className="bg-white p-4 rounded overflow-auto max-h-60">
                {JSON.stringify(promotions, null, 2)}
              </pre>
          </div>
        </div>
      </details>
    </div>
  )
}