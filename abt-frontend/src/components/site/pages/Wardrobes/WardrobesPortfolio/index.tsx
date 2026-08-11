'use client'

import PhotoWithPreview from "@/components/shared/PhotoWithPreview"

export default function WardrobesPortfolio() {
  return (
    <div className="text-center max-w-[1440px] mx-auto">
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">Наши проекты</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/gray-wardrobe.webp"}
                            photoAlt={"Серый встроенный шкаф"}/>
        </div>
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/gray-wardrobe-with-mirror.webp"}
                            photoAlt={"Серый шкаф с зеркалом во весь рост"}/>
        </div>
        <div className="flex flex-col gap-3">
          <PhotoWithPreview photoUrl={"/portfolio/white-wardrobe.webp"}
                            photoAlt={"Белый шкаф-купе"}/>
        </div>
      </div>
    </div>
  )
}