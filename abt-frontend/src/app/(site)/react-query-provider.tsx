'use client'

import {queryClient} from "../../../lib/react-query-client";
import {QueryClientProvider} from "@tanstack/react-query";

export default function ReactQueryProvider({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}