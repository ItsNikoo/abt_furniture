import ReactQueryProvider from '@/providers/react-query-provider'

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  )
}
