"use client"

import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "@/lib/api/products";
import {Product} from "@/types";
import {Card} from "@/components/ui/card";

export default function MainGridContainer() {
    const {data, isLoading, isError} = useQuery({
        queryFn: fetchProducts,
        queryKey: ['products']
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError) {
        return <div>Что-то пошло не так</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {data.map((product: Product) => (
                <Card key={product.id}>
                    <pre>{JSON.stringify(product, null, 2)}</pre>
                </Card>
            ))}
        </div>
    );
}
