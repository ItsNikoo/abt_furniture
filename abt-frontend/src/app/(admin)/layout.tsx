import ReactQueryProvider from "../(site)/react-query-provider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <main>{children}</main>
        </ReactQueryProvider>
    );
}
