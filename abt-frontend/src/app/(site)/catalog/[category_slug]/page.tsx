import {fetchCategories} from "@/lib/api/categories";
import Catalog from "../../../../components/site/Catalog";
import {ContentWrapper} from "@/app/(site)/layout";

export default async function CategoryPage({params}: { params: { category_slug: string } }){
    const {category_slug} = await params;
    const categoriesPromise = fetchCategories()

    return(
        <ContentWrapper>
            <Catalog categoriesPromise={categoriesPromise} selectedCategory={category_slug} />
        </ContentWrapper>
    )
}