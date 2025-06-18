import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Category} from "@/types";
import {Trash2} from "lucide-react";
import UpdateCategoryContainer from "@/components/admin/categories/UpdateCategoryContainer";

export default function CategoryCard({category, onDeleteAction}: {
    category: Category,
    onDeleteAction: (id: number) => Promise<void>,
}) {
    return (
        <Card>
            <CardHeader>
                {category.photo ? (
                    <Image src={category.photo} alt={category.category} width={600} height={500}
                           className="object-cover"/>
                ) : (
                    <div className="bg-gray-200 w-full h-full rounded-t-md"/>
                )}
            </CardHeader>
            <CardContent className='flex flex-row gap-2.5 justify-between'>
                <div>
                    <p className={'text-gray-600 text-sm'}>{category.categorySlug}</p>
                    <h1 className={"text-xl font-bold"}>{category.category}</h1>
                </div>
                <div className="flex gap-2">
                    <UpdateCategoryContainer category={category}/>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteAction(category.id)}
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}