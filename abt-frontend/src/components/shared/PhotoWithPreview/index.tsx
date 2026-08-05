'use client'

import {useCallback, useEffect, useState} from "react"
import Image from "next/image"

interface PhotoWithPreviewProps {
  photoUrl: string;
  photoAlt: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
}

export default function PhotoWithPreview({
                                           photoUrl,
                                           photoAlt,
                                           className = '',
                                           imageClassName = 'object-cover',
                                           fill = false,
                                         }: PhotoWithPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageClick = useCallback((imageUrl: string) => {
    setPreviewUrl(imageUrl)
  }, [])

  const closePreview = useCallback(() => {
    setPreviewUrl(null)
  }, [])

  useEffect(() => {
    if (!previewUrl) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [previewUrl, closePreview])

  return (
    <>
      <button
        type="button"
        onClick={() => handleImageClick(photoUrl)}
        aria-label={`Открыть фото: ${photoAlt}`}
        className={`relative block p-0 border-0 bg-transparent ${className}`}>
        {fill ? (
          <Image src={photoUrl} alt={photoAlt} fill className={imageClassName}/>
        ) : (
          <Image src={photoUrl} alt={photoAlt} width={2000} height={2000} className={imageClassName}/>
        )}
      </button>

      {previewUrl && (
        <div
          onClick={closePreview}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true">
          <button
            type="button"
            onClick={closePreview}
            className="absolute top-4 right-4 z-10 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Закрыть">
            &times;
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] h-[90vh] cursor-default">
            <Image
              src={previewUrl}
              alt={photoAlt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
