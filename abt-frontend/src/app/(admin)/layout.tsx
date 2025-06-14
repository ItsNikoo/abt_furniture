import ReactQueryProvider from "@/app/(site)/react-query-provider";
import {Montserrat, Orelega_One} from "next/font/google";
import "../globals.css";


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

export default function AdminLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html lang="ru">
        <body className={`${orelegaOne.variable} ${montserrat.variable} antialiased`}>
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
        </body>
        </html>
    );

}