'use client';

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateStyle} from "@/lib/api/styles";

interface UpdateStyleProps {
    id: number;
    initialName: string;
    onClose: () => void;
}

export default function UpdateStyleContainer({id, initialName, onClose}: UpdateStyleProps) {
    const queryClient = useQueryClient();
    const [newName, setNewName] = useState(initialName);

    const mutation = useMutation({
        mutationFn: (newStyle: string) => updateStyle(id, {style: newStyle}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['styles']});
            onClose();
        },
        onError: (err) => {
            console.error("Ошибка при обновлении стиля:", err);
            alert("Не удалось обновить стиль");
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (newName.trim() !== "") {
            mutation.mutate(newName.trim());
        }
    }

    return (
        <Card className="w-1/3 mt-4">
            <CardHeader>
                <h2 className="text-2xl font-bold">Редактировать стиль</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
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
