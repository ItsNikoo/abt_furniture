import {Category} from "@/types";
import {use} from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesGrid({promise}: { promise: Promise<Category[]> }) {
    const categories = use(promise);

    return (
        <>
            <h1 className="text-5xl font-orelega-one text-center my-10">Каталог продукции</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {categories.map((category) => (
                    <Link key={category.id} href={`/catalog/${category.category_slug}`}>
                        <div
                             className="relative rounded-3xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow">
                            {/* Фиолетовая полоска сверху */}
                            <div className="absolute top-0 left-0 right-0 h-3 bg-mainPurple z-10"></div>

                            {/* Контент */}
                            <div className="flex flex-col p-10 pt-8">
                                <h2 className="text-3xl mb-3 font-orelega-one">{category.category}</h2>

                                {/* Квадратный контейнер под изображение */}
                                <div className="w-full aspect-square relative overflow-hidden rounded-lg">
                                    <Image
                                        src={category.photo}
                                        alt={category.category}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
