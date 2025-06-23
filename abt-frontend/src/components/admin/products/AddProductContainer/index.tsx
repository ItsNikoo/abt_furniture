'use client'

import { useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Category, Material, ProductData, Style } from '@/types'
import { postProduct } from '@/lib/api/products'
import { queryClient } from '@/lib/react-query-client'
import { useRouter } from 'next/navigation'

interface Props {
  categories: Category[];
  styles: Style[];
  materials: Material[];
}

export default function AddProductContainer({ categories, styles, materials }: Props) {
  const [openCategory, setOpenCategory] = useState(false)
  const [openMaterial, setOpenMaterial] = useState(false)
  const [openStyle, setOpenStyle] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState<ProductData>({
    title: '',
    productSlug: '',
    price: 0,
    description: '',
    category: '',
    material: '',
    style: '',
    photos: [],
    photoFiles: [],
  })

  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductData) => postProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setFormData({
        title: '',
        productSlug: '',
        price: 0,
        description: '',
        category: '',
        material: '',
        style: '',
        photos: [],
        photoFiles: [],
      })
      photoPreviews.forEach((url) => URL.revokeObjectURL(url))
      setPhotoPreviews([])
      setError('')
      setSuccess('Продукт успешно добавлен')
      router.push('/admin/products')
    },
    onError: (err: any) => {
      console.error('Ошибка при добавлении товара:', err)
      const errorMessage = err.response?.data?.photoFiles || err.response?.data?.non_field_errors ||
                           'Не удалось добавить товар. Попробуйте снова.'
      setError(errorMessage)
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url))
      const newFiles = Array.from(files)
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        photoFiles: newFiles,
      }))
      setPhotoPreviews(newPreviews)
    }
  }

  useEffect(() => {
    // Очищаем URL при размонтировании компонента
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photoPreviews])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.price || !formData.category || !formData.description ||
        !formData.productSlug) {
      setError('Поля \'Название\', \'slug\', \'Цена\', \'Описание\' и \'Категория\' обязательны!')
      return
    }
    console.log(formData)
    mutate(formData)
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-800">Добавить продукт</h2>
        </CardHeader>
        <CardContent className="p-6 flex flex-col gap-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Название
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Введите название"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Идентификатор(slug)
              </Label>
              <Input
                id="productSlug"
                name="productSlug"
                type="text"
                value={formData.productSlug}
                onChange={handleInputChange}
                placeholder="Введите productSlug"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                Цена (₽)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Введите цену"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Описание
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Введите описание"
                className="mt-1 min-h-[120px]"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Категория
              </Label>
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
                        {categories.map((category: Category) => (
                          <CommandItem
                            key={category.id}
                            value={category.category}
                            onSelect={(currentValue) => {
                              setFormData((prev) => ({ ...prev, category: currentValue }))
                              setOpenCategory(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                formData.category === category.category ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {category.category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="material" className="text-sm font-medium text-gray-700">
                Материал
              </Label>
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
                        {materials && materials.map((material: Material) => (
                          <CommandItem
                            key={material.id}
                            value={material.material}
                            onSelect={(currentValue) => {
                              setFormData((prev) => ({ ...prev, material: currentValue }))
                              setOpenMaterial(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                formData.material === material.material ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {material.material}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="style" className="text-sm font-medium text-gray-700">
                Стиль
              </Label>
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
                        {styles && styles.map((style: Style) => (
                          <CommandItem
                            key={style.id}
                            value={style.style}
                            onSelect={(currentValue) => {
                              setFormData((prev) => ({ ...prev, style: currentValue }))
                              setOpenStyle(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                formData.style === style.style ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {style.style}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="photos" className="text-sm font-medium text-gray-700">
                Фотографии
              </Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="mt-1"
              />
              {photoPreviews.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Выбрано файлов: {photoPreviews.length}</p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {photoPreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Превью ${index + 1}`}
                        className="w-[100px] h-[100px] object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {error && <p className="text-md text-red-500">{error}</p>}
            {success && <p className="text-md text-green-500">{success}</p>}
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Добавление...' : 'Добавить продукт'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
