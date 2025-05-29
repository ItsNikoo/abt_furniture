import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {updateCategory} from "@/lib/api/categories";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface Props {
    category: string;
    initialData: {
        category: string;
        category_slug: string;
    };
    onClose: () => void;
}

export default function UpdateCategoryContainer({category, initialData, onClose}: Props) {
    const queryClient = useQueryClient();

    const [newCategory, setNewCategory] = useState<string>(initialData.category);
    const [newCategorySlug, setNewCategorySlug] = useState<string>(initialData.category_slug);

    const mutation = useMutation({
        mutationFn: ({
                         oldCategory,
                         updatedData,
                     }: {
            oldCategory: string;
            updatedData: { category: string; category_slug: string };
        }) => updateCategory(oldCategory, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
            onClose();
        },
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory || !newCategorySlug) return;

        mutation.mutate({
            oldCategory: category,
            updatedData: {
                category: newCategory,
                category_slug: newCategorySlug,
            },
        });
    };

    return (
        <Card className="w-1/3 mt-4">
            <CardHeader>
                <h2 className="text-2xl font-bold">Редактировать категорию</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Новое название категории"
                    />
                    <Input
                        value={newCategorySlug}
                        onChange={(e) => setNewCategorySlug(e.target.value)}
                        placeholder="Новый slug категории"
                    />
                    <div className="flex gap-2">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Сохранение..." : "Сохранить"}
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
