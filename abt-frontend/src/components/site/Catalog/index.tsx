"use client";

import {use} from "react";
import Link from "next/link";
import {Category, Product} from "@/types";
import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchProductById, fetchProductsByCategory} from "@/lib/api/products";
import {usePathname} from "next/navigation";
import CatalogCard from "@/components/site/Catalog/CatalogCard"; // добавим usePathname

export default function Catalog({
                                    categoriesPromise,
                                    selectedCategory,
                                }: {
    categoriesPromise: Promise<Category[]>;
    selectedCategory?: string;
}) {
    const queryClient = useQueryClient();
    const categories = use(categoriesPromise);
    const pathname = usePathname(); // получаем текущий путь

    const [currentCategory, setCurrentCategory] = useState<string>(
        selectedCategory ?? categories[0]?.categorySlug
    );

    useEffect(() => {
        // Извлекаем slug категории из URL
        const pathParts = pathname.split('/');
        const categorySlugFromUrl = pathParts[pathParts.length - 1];

        // Проверяем, что такая категория существует
        const categoryExists = categories.some(cat => cat.categorySlug === categorySlugFromUrl);

        if (categoryExists) {
            setCurrentCategory(categorySlugFromUrl);
        } else if (categories.length > 0) {
            setCurrentCategory(categories[0].categorySlug);
        }
    }, [pathname, categories]); // следим за изменениями pathname и categories

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
            <h1 className="font-bold text-7xl mt-10">Каталог</h1>
            <ul className="flex flex-row gap-8 font-medium text-base mt-6">
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link
                            href={`/catalog/${category.categorySlug}`}
                            className={`rounded-md transition cursor-pointer ${
                                currentCategory === category.categorySlug
                                    ? "text-mainPurple"
                                    : "text-black"
                            }`}
                        >
                            {category.category}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* остальной код остается без изменений */}
            <div className="mt-10">
                {isLoading && <p>Загрузка продуктов...</p>}
                {isError && <p>Ошибка при загрузке продуктов</p>}
                {products && products.length > 0 && (
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        {products.map((product: Product) => (
                            <Link key={product.id}
                                  href={`/catalog/${currentCategory}/${product.id}-${product.productSlug}`}
                                  onMouseEnter={() => {
                                      queryClient.prefetchQuery({
                                          queryKey: ['product', product.id],
                                          queryFn: () => fetchProductById(product.id),
                                      });
                                  }}
                            >
                                <CatalogCard product={product}/>
                            </Link>
                        ))}
                    </div>
                )}
                {products && products.length === 0 && !isLoading && <p>Нет продуктов в этой категории.</p>}
            </div>
        </>
    );
}