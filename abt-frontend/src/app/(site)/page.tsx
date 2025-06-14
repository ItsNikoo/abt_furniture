import FirstPage from "@/components/site/FirstPage";
import {fetchSales} from "@/lib/api/sales";
import SalesContainer from "@/components/site/SalesContainer";

export const revalidate = 10; // ISR

export default function Home() {
    const salesPromise = fetchSales();

    return (
        <>
            <SalesContainer promise={salesPromise}/>
            <FirstPage />
        </>
    );
}