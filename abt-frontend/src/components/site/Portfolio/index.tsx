'use client'

import PhotoWithPreview from "@/components/shared/PhotoWithPreview";

export default function Portfolio() {
  return (
    <div className="text-center py-10 max-w-[1440px] mx-auto">
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">Наши проекты</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/yellow-kitchen.webp"}
                            photoAlt={"Кухня в желтом и фиолетовом цветах"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-wardrobe.webp"}
                            photoAlt={"Серый встроенный шкаф"}/>
          <PhotoWithPreview photoUrl={"/portfolio/wooden-bathroom.webp"}
                            photoAlt={"Столешница под дерево в ванную"}/>
        </div>
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/marbel-kitchen.webp"}
                            photoAlt={"Белая кухня с мраморными акцентами"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-kitchen.webp"}
                            photoAlt={"Серая кухня с элементами дерева"}/>
          <PhotoWithPreview photoUrl={"/portfolio/white-wooden-kitchen.webp"}
                            photoAlt={"Белая кухня с элементами дерева"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-wardrobe-with-mirror.webp"}
                            photoAlt={"Серый шкаф с зеркалом во весь рост"}/>
          <PhotoWithPreview photoUrl={"/portfolio/green-kitchen-modern.webp"}
                            photoAlt={"Зеленая кухня в стиле модерн"}/>
        </div>
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/green-kitchen.webp"}
                            photoAlt={"Темно-зеленая кухня"}/>
          <PhotoWithPreview photoUrl={"/portfolio/white-wardrobe.webp"}
                            photoAlt={"Белый шкаф-купе"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-modern-kitchen.webp"}
                            photoAlt={"Серая кухня в стиле модерн"}/>
          <PhotoWithPreview photoUrl={"/portfolio/gray-prihozjaya.webp"}
                            photoAlt={"Серая прихожая"}/>
        </div>
      </div>
    </div>
  )
}