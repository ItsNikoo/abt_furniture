'use client';

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addStyle} from "@/lib/api/styles";

export default function AddStyleContainer() {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState<string>("");

    const postMutation = useMutation({
        mutationFn: (style: string) => addStyle(style),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['styles']}); // обновляем список стилей
            setQuery(""); // очищаем поле ввода после успешного добавления
        },
        onError: (err) => {
            console.error('Ошибка при добавлении стиля:', err);
            alert('Не удалось добавить стиль');
        }
    })

    function handleAddStyle() {
        if (query.trim() === "") {
            alert("Введите название стиля");
            return;
        }
        postMutation.mutate(query.trim());
    }

    return (
        <div className='w-1/3 mt-3'>
            <Card className="shadow-xl border border-gray-200">
                <CardHeader>
                    <h2 className="text-2xl font-bold">Добавить стиль</h2>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddStyle();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Введите название стиля"
                        />
                        <Button type="submit" disabled={postMutation.isPending}>
                            {postMutation.isPending ? "Добавление..." : "Добавить"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}