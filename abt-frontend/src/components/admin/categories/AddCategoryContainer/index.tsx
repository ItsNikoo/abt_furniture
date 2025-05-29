'use client'

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCategory} from "@/lib/api/categories";

export default function AddCategoryContainer() {
    const queryClient = useQueryClient();

    const postMutation = useMutation({
        mutationFn: ({category, category_slug}: {
            category: string,
            category_slug: string
        }) => addCategory({category, category_slug}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            setCategory('')
            setSlug('')
        },
        onError: (err) => {
            console.error('Ошибка при добавлении категории:', err);
            alert('Не удалось добавить категорию');
        }
    });

    const [category, setCategory] = useState<string>('')
    const [slug, setSlug] = useState<string>('')

    function handleAddCategory() {
        if (category.trim() === "" || slug.trim() === "") {
            alert("Введите полные данные о категории");
            return;
        }
        postMutation.mutate({category, category_slug: slug})
    }

    return (
        <div className='w-1/3 mt-3'>
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
                        <Button type='submit'>Добавить категорию</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}