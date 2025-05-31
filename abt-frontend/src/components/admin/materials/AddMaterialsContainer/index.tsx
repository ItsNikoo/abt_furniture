"use client"

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addMaterial} from "@/lib/api/materials";

export default function AddMaterialsContainer() {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState<string>("");

    const postMutation = useMutation({
        mutationFn: (material: string) => addMaterial(material),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['materials']});
            setQuery("");
        },
        onError: (err) => {
            console.error('Ошибка при добавлении материала:', err);
            alert('Не удалось добавить материал');
        }
    })

    function handleAddMaterial() {
        if (query.trim() === "") {
            alert("Введите материал")
            return
        }
        postMutation.mutate(query.trim())
    }

    return (
        <div className='w-1/3 mt-3'>
            <Card className="shadow-xl border border-gray-200">
                <CardHeader>
                    <h2 className="text-2xl font-bold">Добавить материал</h2>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddMaterial();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Введите материал"
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