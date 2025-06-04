import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import garbage from "../../../../../public/trash-svgrepo-com.svg";
import {Product} from "@/types";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteProduct} from "@/lib/api/products";
import {Photo} from "@/types";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
        },
        onError: (err) => {
            console.error('Ошибка при удалении продукта:', err);
            alert('Не удалось удалить продукт');
        }
    })

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Предотвращаем всплытие события к Link
        deleteMutation.mutate(product.id);
    };

    return (
        <Card
            className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200"
        >
            <CardHeader className="flex flex-row items-center justify-between p-4 rounded-t-lg">
                <div>
                    <h1 className="font-bold text-xl text-gray-800">{product.title}</h1>
                    <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <Button size='icon' className="bg-gray-200 hover:bg-gray-300"
                        onClick={handleDelete}>
                    <Image src={garbage} alt="Удалить" width={20} height={20}/>
                </Button>
            </CardHeader>
            <CardContent className="p-4">
                <Link href={`/admin/products/${product.id}`} key={product.id}>
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-medium ">
                            Цена: <span className="font-semibold">{product.price} ₽</span>
                        </p>
                        <p className="text-md text-gray-600">
                            Материал: {product.material}
                        </p>
                        <p>
                            Стиль: {product.style ?? "не определен"}
                        </p>
                        <p className="text-md text-gray-600">
                            Описание: {product.description}
                        </p>
                        {product.photos && product.photos.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 mb-3">Фотографии:</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {product.photos.map((photo: Photo, index) => (
                                        <Image
                                            key={index}
                                            src={photo.photo_url}
                                            width={200}
                                            height={200}
                                            alt={`${product.title} Фото ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Link>

            </CardContent>
        </Card>
    )
}