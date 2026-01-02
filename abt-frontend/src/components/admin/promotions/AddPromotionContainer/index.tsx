'use client'

import {useEffect, useState} from 'react'
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {Check, ChevronsUpDown} from 'lucide-react'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import {PromotionData, Category, Style, Material} from '@/types'
import {postPromotionAction} from "@/actions/promotions";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {ADMIN_ROUTES} from "@/config/navigation";

interface Props {
  categories: Category[]
  styles: Style[]
  materials: Material[]
}

export default function AddPromotionContainer({categories, styles, materials}: Props) {
  const [openCategory, setOpenCategory] = useState(false)
  const [openStyle, setOpenStyle] = useState(false)
  const [openMaterial, setOpenMaterial] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  const [formData, setFormData] = useState<PromotionData>({
    title: '',
    productSlug: '',
    price: 0,
    description: '',
    size: '',
    category: '',
    material: '',
    style: '',
    photos: [],
    photoFiles: [],
    deletePhotos: [],
  })

  const router = useRouter()

  // Очистка object URL при размонтировании или смене файлов
  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photoPreviews])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' ? (value === '' ? 0 : Number(value)) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Очищаем старые превью
    photoPreviews.forEach((url) => URL.revokeObjectURL(url))

    const newFiles = Array.from(files)
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))

    setFormData((prev) => ({
      ...prev,
      photoFiles: newFiles,
    }))
    setPhotoPreviews(newPreviews)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()

      if (
        !formData.title.trim() ||
        !formData.productSlug.trim() ||
        !formData.price ||
        !formData.description.trim() ||
        !formData.size.trim() ||
        !formData.category
      ) {
        alert('Заполните все обязательные поля')
        return
      }

      setIsLoading(true)
      const token = Cookies.get('token')

      // Создаем FormData
      const submitFormData = new FormData()
      submitFormData.append('title', formData.title)
      submitFormData.append('productSlug', formData.productSlug)
      submitFormData.append('price', formData.price.toString())
      submitFormData.append('description', formData.description)
      submitFormData.append('size', formData.size)
      submitFormData.append('category', formData.category)

      if (formData.material) {
        submitFormData.append('material', formData.material)
      }
      if (formData.style) {
        submitFormData.append('style', formData.style)
      }

      // Добавляем файлы
      if (formData.photoFiles && formData.photoFiles.length > 0) {
        formData.photoFiles.forEach((file) => {
          submitFormData.append('photoFiles', file)
        })
      }

      await postPromotionAction(submitFormData, token as string)

      setSuccess("Предложение успешно создано!")
      setTimeout(() => {
        router.push(ADMIN_ROUTES.PROMOTIONS.path)
        setSuccess(null)
        setFormData({
          title: '',
          productSlug: '',
          price: 0,
          description: '',
          size: '',
          category: '',
          material: '',
          style: '',
          photos: [],
          photoFiles: [],
          deletePhotos: [],
        })
      }, 1000)
    } catch (error) {
      setError('Не удалось создать предложение: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-800">Добавить специальное предложение</h2>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Название */}
            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Введите название предложения"
                className="mt-1"
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="productSlug">Идентификатор (slug)</Label>
              <Input
                id="productSlug"
                name="productSlug"
                type="text"
                value={formData.productSlug}
                onChange={handleInputChange}
                placeholder="product-slug"
                className="mt-1"
              />
            </div>

            {/* Цена */}
            <div>
              <Label htmlFor="price">Цена (₽)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price || ''}
                onChange={handleInputChange}
                placeholder="0"
                className="mt-1"
              />
            </div>

            {/* Размер */}
            <div>
              <Label htmlFor="size">Размер</Label>
              <Input
                id="size"
                name="size"
                type="text"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="Например: 200x90x75 см"
                className="mt-1"
              />
            </div>

            {/* Описание */}
            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Подробное описание предложения"
                className="mt-1 min-h-[120px]"
              />
            </div>

            {/* Категория */}
            <div>
              <Label>Категория</Label>
              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategory}
                    className="w-full justify-between mt-1"
                  >
                    {formData.category || 'Выберите категорию...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Поиск категории..."/>
                    <CommandList>
                      <CommandEmpty>Категории не найдены.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((cat) => (
                          <CommandItem
                            key={cat.id}
                            value={cat.category}
                            onSelect={(value) => {
                              setFormData((prev) => ({...prev, category: value}))
                              setOpenCategory(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                formData.category === cat.category ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {cat.category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Материал (опционально) */}
            <div>
              <Label>Материал (опционально)</Label>
              <Popover open={openMaterial} onOpenChange={setOpenMaterial}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openMaterial}
                    className="w-full justify-between mt-1"
                  >
                    {formData.material || 'Выберите материал...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Поиск материала..."/>
                    <CommandList>
                      <CommandEmpty>Материалы не найдены.</CommandEmpty>
                      <CommandGroup>
                        {materials.map((mat) => (
                          <CommandItem
                            key={mat.id}
                            value={mat.material}
                            onSelect={(value) => {
                              setFormData((prev) => ({
                                ...prev,
                                material: value || undefined,
                              }))
                              setOpenMaterial(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                formData.material === mat.material ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {mat.material}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Стиль (опционально) */}
            <div>
              <Label>Стиль (опционально)</Label>
              <Popover open={openStyle} onOpenChange={setOpenStyle}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStyle}
                    className="w-full justify-between mt-1"
                  >
                    {formData.style || 'Выберите стиль...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Поиск стиля..."/>
                    <CommandList>
                      <CommandEmpty>Стили не найдены.</CommandEmpty>
                      <CommandGroup>
                        {styles.map((st) => (
                          <CommandItem
                            key={st.id}
                            value={st.style}
                            onSelect={(value) => {
                              setFormData((prev) => ({
                                ...prev,
                                style: value || undefined,
                              }))
                              setOpenStyle(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                formData.style === st.style ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {st.style}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Фотографии */}
            <div>
              <Label htmlFor="photos">Фотографии</Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="mt-1"
              />
              {photoPreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Выбрано файлов: {photoPreviews.length}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {photoPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={preview}
                          alt={`Превью ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-md border border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Добавление...' : 'Добавить предложение'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}