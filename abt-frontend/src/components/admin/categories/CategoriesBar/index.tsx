'use client'

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchCategories, deleteCategory} from "@/lib/api/categories";
import {Category} from "@/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import trash from "../../../../../public/trash-svgrepo-com.svg";
import UpdateCategoryContainer from "@/components/admin/categories/UpdateCategoryContainer";
import {useState} from "react";

interface CategoryProps {
    category: string | null;
    category_slug: string | null;
}

export default function CategoriesBar() {
    const queryClient = useQueryClient()
    const [slug, setSlug] = useState<string | null>(null)
    const [categoryData, setCategoryData] = useState<CategoryProps>({
        category: null,
        category_slug: null,
    })


    const deleteMutation = useMutation({
        mutationFn: (category_slug: string) => deleteCategory(category_slug),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
        onError: (err) => {
            console.error('Ошибка при удалении категории:', err);
            alert('Не удалось удалить категорию');
        }
    })


    const {data, error, isLoading} = useQuery({
        queryFn: fetchCategories,
        queryKey: ['categories'],
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки стилей: {error.message}</div>;
    }

    return (
        <div>
            <div className={'grid grid-cols-3 gap-4'}>
                {data?.map((category: Category) => (
                    <Card key={category.id}>
                        <CardHeader className='flex-row gap-2.5'>
                            <div>
                                <p className={'text-gray-600 text-sm'}>{category.category_slug}</p>
                                <h1 className={"text-xl font-bold"}>{category.category}</h1>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => {
                                        setSlug(category.category_slug);
                                        setCategoryData({
                                            category: category.category,
                                            category_slug: category.category_slug,
                                        });
                                    }}
                                >
                                    ✏️
                                </Button>
                                <Button
                                    size="icon"
                                    className="bg-gray-200 hover:bg-gray-300"
                                    onClick={() => deleteMutation.mutate(category.category_slug)}
                                >
                                    <Image src={trash} alt="Удалить" width={20} height={20}/>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {category.photo ? (
                                <Image src={category.photo} alt={category.category} width={600} height={500}
                                     className="object-cover"/>
                            ) : (
                                <div className="bg-gray-200 w-full h-full rounded-t-md"/>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            {slug && categoryData.category && categoryData.category_slug && (
                <UpdateCategoryContainer
                    category={slug}
                    initialData={{
                        category: categoryData.category,
                        category_slug: categoryData.category_slug,
                    }}
                    onClose={() => {
                        setSlug(null);
                        setCategoryData({category: null, category_slug: null});
                    }}
                />
            )}
        </div>
    )

}