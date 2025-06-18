import {fetchCategories} from "@/lib/api/categories";
import Catalog from "../../../../components/site/Catalog";
import ContentWrapper from "@/components/ContentWrapper";

type Props = {
    params: Promise<{ categorySlug: string }>;
};

export default async function CategoryPage({ params }: Props) {
    const { categorySlug } = await params;
    const categoriesPromise = fetchCategories();

    return (
        <ContentWrapper>
            <Catalog categoriesPromise={categoriesPromise} selectedCategory={categorySlug} />
        </ContentWrapper>
    );
}