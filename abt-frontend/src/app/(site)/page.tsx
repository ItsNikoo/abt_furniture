import FirstPage from "@/components/site/FirstPage";
import {fetchSales} from "@/lib/api/sales";
import SalesContainer from "@/components/site/SalesContainer";
import {fetchCategories} from "@/lib/api/categories";
import ContentWrapper from "@/components/ContentWrapper";
import CategoriesGrid from "@/components/site/CategoriesGrid";

export const revalidate = 10; // ISR

export default async function Home() {
    const salesPromise = fetchSales();
    const categoriesPromise = fetchCategories();

    return (
        <>
            <SalesContainer promise={salesPromise}/>
            <FirstPage/>
            <ContentWrapper>
                <CategoriesGrid promise={categoriesPromise}/>
            </ContentWrapper>
        </>
    );
}