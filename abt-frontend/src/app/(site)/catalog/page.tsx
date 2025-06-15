// page.tsx (или CatalogPage.tsx)
import { ContentWrapper } from "@/app/(site)/layout";
import Catalog from "../../../components/site/Catalog";
import { fetchCategories } from "@/lib/api/categories";

export default function CatalogPage() {
    const categoriesPromise = fetchCategories();

    return (
        <ContentWrapper>
            <Catalog categoriesPromise={categoriesPromise} />
        </ContentWrapper>
    );
}
