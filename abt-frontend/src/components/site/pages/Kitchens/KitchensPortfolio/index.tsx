'use client'

import PhotoWithPreview from "@/components/shared/PhotoWithPreview"

export default function KitchensPortfolio() {
  return (
    <div className="text-center max-w-[1440px] mx-auto">
      <h2 className="text-xl sm:text-3xl font-extrabold text-center md:mb-6 mb-4">Примеры наших работ</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/yellow-kitchen.webp"}
                            photoAlt={"Кухня в желтом и фиолетовом цветах"}/>
          <PhotoWithPreview photoUrl={"/portfolio/white-wooden-kitchen.webp"}
                            photoAlt={"Белая кухня с элементами дерева"}/>
        </div>
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/marbel-kitchen.webp"}
                            photoAlt={"Белая кухня с мраморными акцентами"}/>
          <PhotoWithPreview photoUrl={"/portfolio/green-kitchen-modern.webp"}
                            photoAlt={"Зеленая кухня в стиле модерн"}/>
        </div>
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/green-kitchen.webp"}
                            photoAlt={"Темно-зеленая кухня"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-modern-kitchen.webp"}
                            photoAlt={"Серая кухня в стиле модерн"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-kitchen.webp"}
                            photoAlt={"Серая кухня с элементами дерева"}/>
        </div>
      </div>
    </div>
  )
}