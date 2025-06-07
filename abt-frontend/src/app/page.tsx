import ClientPage from './ClientPage';
import {ContentWrapper} from "@/app/layout";
import Header from "@/components/site/Header";
import FirstPage from "@/components/site/FirstPage";

export const revalidate = 10; // ISR

export default async function Home() {
    const res = await fetch('http://127.0.0.1:8000/api/products', {
        next: {revalidate: 10},
    });
    const products = await res.json();

    return (
        <>
            <FirstPage />
        </>
    );
}