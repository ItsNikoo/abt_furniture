import type {Metadata} from "next";
import {Montserrat, Orelega_One} from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/app/react-query-provider";
import Header from "@/components/site/Header";

// Настройка Orelega One
const orelegaOne = Orelega_One({
    weight: ["400"],
    subsets: ["latin", "cyrillic"],
    variable: "--font-orelega-one",
});

// Настройка Montserrat
const montserrat = Montserrat({
    weight: ["400", "500", "700"],
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Создать приложение Next",
    description: "Сгенерировано с помощью create next app",
};

export function ContentWrapper({children, Margin = true}: { children: React.ReactNode; Margin?: boolean }) {
    return <div className={!Margin ? "" : "mx-[100px]"}>{children}</div>;
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className={`${orelegaOne.variable} ${montserrat.variable} antialiased`}>
        <ReactQueryProvider>
            <ContentWrapper>
                <Header/>
            </ContentWrapper>
            <main>{children}</main>
        </ReactQueryProvider>
        </body>
        </html>
    );
}