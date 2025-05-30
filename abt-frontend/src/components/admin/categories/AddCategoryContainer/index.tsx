'use client'

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCategory} from "@/lib/api/categories";

interface CategoryMutationParams {
    category: string;
    category_slug: string;
    photo: File | null;
}

export default function AddCategoryContainer() {
    const queryClient = useQueryClient();

    const [category, setCategory] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const postMutation = useMutation({
        mutationFn: ({category, category_slug, photo}: CategoryMutationParams) => {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('category_slug', category_slug);
            if (photo) {
                formData.append('photo_file', photo);
            }
            return addCategory(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            setCategory('');
            setSlug('');
            setPhoto(null);
            setPreview(null);
            setError(null);
            alert('Категория успешно добавлена!');
        },
        onError: (err: Error) => {
            console.error('Ошибка при добавлении категории:', err);
            setError('Не удалось добавить категорию. Попробуйте снова.');
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Размер файла не должен превышать 5 МБ.');
                setPhoto(null);
                setPreview(null);
                return;
            }
            if (!file.name.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
                setError('Поддерживаются только файлы PNG, JPG, JPEG.');
                setPhoto(null);
                setPreview(null);
                return;
            }
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
            setError(null);
        } else {
            setPhoto(null);
            setPreview(null);
            setError('Пожалуйста, выберите файл изображения.');
        }
    };

    const handleAddCategory = () => {
        if (category.trim() === '' || slug.trim() === '') {
            setError('Введите название категории и slug');
            return;
        }
        if (!photo) {
            setError('Выберите изображение для категории');
            return;
        }
        postMutation.mutate({category, category_slug: slug, photo});
    };

    return (
        <div className="w-1/3 mt-3">
            <Card className="shadow-xl border border-gray-200">
                <CardHeader>
                    <h2 className="text-2xl font-bold">Добавить Категорию</h2>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddCategory();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Введите категорию"
                        />
                        <Input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="Введите slug категории"
                        />
                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                Фото категории
                            </label>
                            <Input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Превью"
                                    className="mt-2 max-w-[200px] rounded"
                                />
                            )}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" disabled={postMutation.isPending}>
                            {postMutation.isPending ? 'Добавление...' : 'Добавить категорию'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}