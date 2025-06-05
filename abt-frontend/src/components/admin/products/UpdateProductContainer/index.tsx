"use client"

import {useParams} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {patchProduct} from "@/lib/api/products";
import {Category, Material, Photo, Product, ProductData, Style} from "@/types";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {queryClient} from "../../../../../lib/react-query-client";
import Image from "next/image";
import garbage from "../../../../../public/trash-svgrepo-com.svg";

interface Props {
    categories: Category[];
    styles: Style[];
    materials: Material[];
    data: Product;
}

export default function UpdateProductContainer({categories, styles, materials, data}: Props) {
    const {id} = useParams()

    const [formData, setFormData] = useState<ProductData>({
        title: "",
        price: 0,
        description: "",
        category: "",
        material: "",
        style: "",
        photos: [],
        delete_photos: [],
        photo_files: []
    });
    const [openCategory, setOpenCategory] = useState(false);
    const [openMaterial, setOpenMaterial] = useState(false);
    const [openStyle, setOpenStyle] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title ?? "",
                price: data.price ?? 0,
                description: data.description ?? "",
                category: data.category ?? "",
                material: data.material ?? "",
                style: data.style ?? "",
                photos: data.photos ?? [],
                delete_photos: [],
                photo_files: []
            });
        }
    }, [data]);

    const {mutate, isPending} = useMutation({
        mutationFn: ({data, id}: { data: ProductData; id: number }) => patchProduct(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            setSuccess("Продукт успешно обновлён!");
            setError("");
            setTimeout(() => setSuccess(""), 3000); // Скрыть сообщение через 3 секунды
        },
        onError: (err: Error) => {
            console.error("Ошибка при редактировании товара:", err);
            setError(`Не удалось обновить товар: ${err.message}`);
            setSuccess("");
        },
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            photoPreviews.forEach((url) => URL.revokeObjectURL(url));
            const newFiles = Array.from(files);
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setFormData((prev) => ({
                ...prev,
                photo_files: newFiles
            }));
            setPhotoPreviews(newPreviews);
        }
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate({data: formData, id: Number(id)});
    }

    return (
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg rounded-lg border border-gray-200">
                <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                    <h2 className="text-2xl font-bold text-gray-800">Редактировать продукт {id}</h2>
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
                                        {formData.category || "Выберите категорию..."}
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
                                                            setFormData((prev) => ({...prev, category: currentValue}));
                                                            setOpenCategory(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                formData.category === category.category ? "opacity-100" : "opacity-0"
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
                                        {formData.material || "Выберите материал..."}
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
                                                            setFormData((prev) => ({...prev, material: currentValue}));
                                                            setOpenMaterial(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                formData.material === material.material ? "opacity-100" : "opacity-0"
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
                            <Label htmlFor="styles" className="text-sm font-medium text-gray-700">
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
                                        {formData.style || "Выберите стиль..."}
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
                                                            setFormData((prev) => ({...prev, style: currentValue}));
                                                            setOpenStyle(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                formData.style === style.style ? "opacity-100" : "opacity-0"
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
                        {data.photos && data.photos.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-2">Фотографии:</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {data.photos.map((photo: Photo, index) => {
                                        const isMarkedForDeletion = formData.delete_photos?.includes(photo.photo_url);
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className="relative w-32 h-32 group"
                                                aria-label={`Фото ${index + 1} для ${data.title}`}
                                                onClick={() => {
                                                    setFormData((prev) => {
                                                        const deletePhotos = prev.delete_photos ?? [];
                                                        const alreadyMarked = deletePhotos.includes(photo.photo_url);
                                                        return {
                                                            ...prev,
                                                            delete_photos: alreadyMarked
                                                                ? deletePhotos.filter((url) => url !== photo.photo_url)
                                                                : [...deletePhotos, photo.photo_url],
                                                        };
                                                    });
                                                }}
                                            >
                                                <Image
                                                    src={photo.photo_url}
                                                    width={200}
                                                    height={200}
                                                    alt={`${data.title} Фото ${index + 1}`}
                                                    className={cn(
                                                        "w-32 h-32 object-cover rounded-md transition-opacity",
                                                        "group-hover:opacity-80",
                                                        isMarkedForDeletion && "border-4 border-red-500"
                                                    )}
                                                />
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 rounded-md">
                                                    <Image
                                                        src={garbage}
                                                        width={32}
                                                        height={32}
                                                        alt="Иконка действия"
                                                        className="w-8 h-8"
                                                    />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div>
                            <Label>Добавить фотографии (PNG, JPG, JPEG, до 5 МБ)</Label>
                            <Input
                                type="file"
                                multiple
                                accept=".png,.jpg,.jpeg,.WEBP"
                                onChange={handleFileChange}
                            />
                        </div>

                        {photoPreviews.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-2">Превью новых фотографий:</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {photoPreviews.map((preview, index) => (
                                        <Image
                                            key={index}
                                            src={preview}
                                            width={200}
                                            height={200}
                                            alt={`Превью фото ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && <p className="text-md text-red-500">{error}</p>}
                        {success && <p className="text-md text-green-500">{success}</p>}
                        <Button type='submit'
                                disabled={isPending}>{isPending ? "Обновление..." : "Обновить продукт"}</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}