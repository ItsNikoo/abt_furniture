"use client";

import {use} from "react"; // React 18+ use hook для промисов
import Link from "next/link";
import {Category, Product} from "@/types";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchProductsByCategory} from "@/lib/api/products";
import PhotoCarousel from "@/components/ui/Embla/PhotoCarousel"; // твоя функция для получения продуктов

export default function Catalog({
                                    categoriesPromise,
                                    selectedCategory,
                                }: {
    categoriesPromise: Promise<Category[]>;
    selectedCategory?: string; // необязательный проп
}) {
    const categories = use(categoriesPromise); // "разворачиваем" промис

    const [currentCategory, setCurrentCategory] = useState<string>(
        selectedCategory ?? categories[0]?.category_slug
    );

    useEffect(() => {
        if (selectedCategory) {
            setCurrentCategory(selectedCategory);
        } else if (categories.length > 0 && !currentCategory) {
            setCurrentCategory(categories[0].category_slug);
        }
    }, [categories, selectedCategory]);

    // useQuery для загрузки продуктов по текущей категории
    const {data: products, isLoading, isError} = useQuery({
        queryKey: [`products`, currentCategory],
        queryFn: async ({queryKey}) => {
            const categorySlug = queryKey[1];
            const res = await fetchProductsByCategory(categorySlug);
            return res;
        },
        enabled: !!currentCategory,
    });

    return (
        <>
            <h1 className="font-orelega-one text-7xl mt-10">Каталог</h1>
            <ul className="flex flex-row gap-8 font-bold text-base mt-6">
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link
                            href={`/catalog/${category.category_slug}`}
                            onClick={() => setCurrentCategory(category.category_slug)}
                            className={`rounded-md transition cursor-pointer ${
                                currentCategory === category.category_slug
                                    ? "text-mainPurple"
                                    : "text-gray-700"
                            }`}
                        >
                            {category.category}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-10">
                {isLoading && <p>Загрузка продуктов...</p>}
                {isError && <p>Ошибка при загрузке продуктов</p>}
                {products && products.length > 0 && (
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        {products.map((product: Product) => (
                            <div key={product.id} className="bg-backgroundGray rounded-xl">
                                {product.photos &&
                                    <div className='mb-3 rounded-xl overflow-hidden relative'>
                                        <PhotoCarousel photos={product.photos}/>
                                        <div
                                            className="absolute top-2 left-2 bg-mainPurple text-white text-xs font-semibold px-2 py-1 rounded-md z-20 select-none"
                                            style={{pointerEvents: 'none'}} // чтобы не мешал кликам
                                        >
                                            {product.style}
                                        </div>
                                    </div>
                                }
                                <div className='flex flex-col gap-0 px-4 mb-2'>
                                    <p className='text-gray-400'>{product.category}</p>
                                    <h2 className="text-2xl font-semibold">{product.title}</h2>
                                    <div className='flex flex-row gap-1.5'>
                                        <p className='text-gray-400'>Цена за погонный метр - </p>
                                        <p>{product.price} руб.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {products && products.length === 0 && !isLoading && <p>Нет продуктов в этой категории.</p>}
            </div>
        </>
    );
}