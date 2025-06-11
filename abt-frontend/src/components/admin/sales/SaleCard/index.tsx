"use client";

import {Sale} from "@/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import UpdateSaleContainer from "@/components/admin/sales/UpdateSaleContainer";
import Image from "next/image";

export default function SaleCard({sale, onDeleteAction}: {
    sale: Sale;
    onDeleteAction: (id: string) => Promise<void>;
}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <h1 className="font-bold text-xl m-0 p-0">{sale.title}</h1>
                    <div className="flex gap-2">
                        <UpdateSaleContainer sale={sale}/>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteAction(sale.id)}
                        >
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <p className="text-gray-500 text-base m-0 p-0">{sale.description}</p>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2.5'>
                    {sale.photo && <Image src={sale.photo} alt={sale.title} width={500} height={500}/>}
                    <a href={sale.link} className="text-blue-800 font-bolder underline">
                        {sale.link}
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}