'use client'

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Card, CardHeader} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import trash from "../../../../../public/trash-svgrepo-com.svg";
import {useState} from "react";
import {fetchMaterials, deleteMaterial} from "@/lib/api/materials";
import {Material} from "@/types";
import UpdateMaterialContainer from "@/components/admin/materials/UpdateMaterialContainer";

export default function MaterialsBar() {
    const queryClient = useQueryClient()
    const [editId, setEditId] = useState<number | null>(null);
    const [material, setMaterial] = useState<string>("")

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteMaterial(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['materials']});
        },
        onError: (err) => {
            console.error('Ошибка при удалении материала:', err);
            alert('Не удалось удалить материал');
        }
    })

    const {data, error, isLoading} = useQuery<Material[]>({
        queryFn: fetchMaterials,
        queryKey: ['materials'],
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
            <div className={'flex gap-2.5'}>
                {data?.map((material: Material) => (
                    <Card key={material.id}>
                        <CardHeader className='flex-row items-center gap-2.5'>
                            <div>
                                <p className={'text-xl font-bold'}>{material.material}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => {
                                        setMaterial(material.material);
                                        setEditId(material.id);
                                    }}
                                >
                                    ✏️
                                </Button>
                                <Button
                                    size="icon"
                                    className="bg-gray-200 hover:bg-gray-300"
                                    onClick={() => deleteMutation.mutate(material.id)}
                                >
                                    <Image src={trash} alt="Удалить" width={20} height={20}/>
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            {editId && <UpdateMaterialContainer
                id={editId}
                material={material}
                onClose={() => setEditId(null)}
            />}
        </div>
    )

}