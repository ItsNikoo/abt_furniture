import {Category} from "@/types";

export default function CategoriesBar({categories}: { categories: Category[] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <ul className="list-disc pl-5">
                {categories.map((category) => (
                    <li key={category.id} className="mb-2">
                        <span className="font-semibold">{category.category} | {category.category_slug}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

}