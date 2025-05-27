'use client'

import {Product} from "@/types";

interface Props {
    initialData: Product[];
}

export default function ClientPage({initialData}: Props) {

    return (
        <div className="p-4">
            {initialData.map((product: Product) => (
                <div key={product.id}>
                    {JSON.stringify(product, null, 2)}
                </div>
            ))}
        </div>
    )
}
