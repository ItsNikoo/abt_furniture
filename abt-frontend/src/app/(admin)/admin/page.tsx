import ProductsPage from "@/app/(admin)/admin/products/page"
import ReactQueryProvider from "@/providers/react-query-provider"

export default async function AdminPage() {

  return (
    <ReactQueryProvider>
      <ProductsPage />
    </ReactQueryProvider>
  )
}
