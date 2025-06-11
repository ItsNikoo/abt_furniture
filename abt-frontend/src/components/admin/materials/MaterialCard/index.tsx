"use client"

import {Material, Sale} from "@/types";
import {Card, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import trash from "../../../../../public/trash-svgrepo-com.svg";
import {Pencil, Trash2} from "lucide-react";
import UpdateMaterialContainer from "@/components/admin/materials/UpdateMaterialContainer";

export default function MaterialCard({material, onDeleteAction}: {
    material: Material,
    onDeleteAction: (id: number) => Promise<void>;
}) {
    return (
        <div>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <p className='text-xl font-bold'>{material.material}</p>
                    <div>
                        <UpdateMaterialContainer material={material} />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteAction(material.id)}
                        >
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}