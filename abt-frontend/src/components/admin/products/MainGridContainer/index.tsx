"use client";

import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "@/lib/api/products";
import {Product} from "@/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

export default function MainGridContainer() {
    const {data, isLoading, isError} = useQuery({
        queryFn: fetchProducts,
        queryKey: ['products']
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-lg text-gray-500">Загрузка...</div>;
    }

    if (isError) {
        return <div className="flex justify-center items-center h-screen text-lg text-red-500">Что-то пошло не
            так</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((product: Product) => (
                    <Card
                        key={product.id}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200"
                    >
                        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                            <h1 className="font-bold text-xl text-gray-800">{product.title}</h1>
                            <p className="text-sm text-gray-500">{product.category}</p>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="bg-gray-100 p-4 rounded-md">
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Цена: <span className="font-semibold">{product.price} ₽</span>
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    Описание: {product.description}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    Материал: {product.material}
                                </p>
                                {product.styles && product.styles.length > 0 && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        Стили: {product.styles.join(", ")}
                                    </p>
                                )}
                                {/*{product.photos && product.photos.length > 0 && (*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <p className="text-sm text-gray-600">Фотографии:</p>*/}
                                {/*        <div className="flex gap-2 mt-1">*/}
                                {/*            {product.photos.map((photo, index) => (*/}
                                {/*                <img*/}
                                {/*                    key={index}*/}
                                {/*                    src={photo}*/}
                                {/*                    alt={`${product.title} photo ${index + 1}`}*/}
                                {/*                    className="w-16 h-16 object-cover rounded-md"*/}
                                {/*                />*/}
                                {/*            ))}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}