'use client'

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Pencil} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Category, CategoryData} from "@/types";
import Image from "next/image";
import {patchCategoryAction} from "@/actions/categories";


export default function UpdateCategoryContainer({category}: { category: Category }) {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<CategoryData>({
        categorySlug: category.categorySlug,
        category: category.category,
        photo: category.photo,
        photoFile: null
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            patchCategoryAction(category.id, formData);
            setPreviewUrl(null);
            setSuccess("Категория успешно изменена");
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(null);
            }, 2000);
        } catch (error) {
            setError('Не удалось обновить категорию. Пожалуйста, попробуйте позже: ' + error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({...prev, photoFile: file}));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактирование категории</DialogTitle>
                    <DialogDescription>
                        В этом окне вы можете редактировать категорию.
                    </DialogDescription>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                        <div>
                            <Label>Категория</Label>
                            <Input
                                id="category"
                                name="category"
                                type="text"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Идентификатор категории</Label>
                            <Input
                                id="categorySlug"
                                name="categorySlug"
                                type="text"
                                value={formData.categorySlug}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            {formData.photo && (
                                <Image src={formData.photo} alt={`Фотография категории ${category.category}`}
                                       width={128}
                                       height={128}/>
                            )}
                            <div>
                                <Label>Добавить фото</Label>
                                <Input
                                    id="photoFile"
                                    name="photoFile"
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleFileChange}
                                />
                                {previewUrl && (
                                    <Image
                                        src={previewUrl}
                                        alt="Предпросмотр"
                                        className="mt-2 w-32 h-32 object-cover rounded-md border"
                                        width={128}
                                        height={128}
                                    />
                                )}
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                        <div className='flex justify-end gap-2 mt-2'>
                            <DialogClose asChild>
                                <Button variant="secondary">Отмена</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Обновление..." : "Обновить категорию"}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
