'use client'

import {Style} from "@/types"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {fetchStyles, deleteStyle} from "@/lib/api/styles"
import {Card, CardHeader} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import trash from "../../../../../public/trash-svgrepo-com.svg"
import Image from "next/image"
import {useState} from "react";
import UpdateStyleContainer from "@/components/admin/styles/UpdateStyleContainer";

export default function StylesBar() {
    const queryClient = useQueryClient();

    const [editId, setEditId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const {data, error, isLoading} = useQuery({
        queryFn: fetchStyles,
        queryKey: ['styles'],
        refetchOnWindowFocus: false,
    });

    const {mutate} = useMutation({
        mutationFn: (id: number) => deleteStyle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['styles']}); // обновляем список
        },
        onError: (err) => {
            console.error('Ошибка при удалении стиля:', err);
            alert('Не удалось удалить стиль');
        }
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки стилей: {error.message}</div>;
    }

    return (
        <div>
            <ul className='flex gap-2.5'>
                {data?.map((style: Style) => (
                    <Card key={style.id}>
                        <CardHeader className='flex-row items-center gap-2'>
                            <p className='font-semibold'>
                                {style.style}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => {
                                        setEditId(style.id);
                                        setEditValue(style.style);
                                    }}
                                >
                                    ✏️
                                </Button>
                                <Button
                                    size="icon"
                                    className="bg-gray-200 hover:bg-gray-300"
                                    onClick={() => mutate(style.id)}
                                >
                                    <Image src={trash} alt="Удалить" width={20} height={20}/>
                                </Button>
                            </div>
                        </CardHeader>

                    </Card>
                ))}
            </ul>
            {editId && (
                <UpdateStyleContainer
                    id={editId}
                    initialName={editValue}
                    onClose={() => setEditId(null)}
                />
            )}
        </div>
    );
}