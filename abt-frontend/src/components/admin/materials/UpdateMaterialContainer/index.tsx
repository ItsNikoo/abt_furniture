"use client"

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {updateMaterial} from "@/lib/api/materials";

interface UpdateMaterialProps {
    id: number,
    material: string,
    onClose: () => void
}

export default function UpdateMaterialContainer({id, material, onClose}: UpdateMaterialProps) {
    const queryClient = useQueryClient();
    const [newMaterial, setNewMaterial] = useState<string>(material);

    const mutation = useMutation({
        mutationFn: (newMaterial: string) => updateMaterial(id, {material: newMaterial}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['materials']});
            onClose();
        },
        onError: (err) => {
            console.error("Ошибка при обновлении материала:", err);
            alert("Не удалось обновить материал");
        },
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (newMaterial.trim() !== "") {
            mutation.mutate(newMaterial.trim());
        }
    }

    return (
        <Card className="w-1/3 mt-4">
            <CardHeader>
                <h2 className="text-2xl font-bold">Редактировать материал</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Новое название"
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