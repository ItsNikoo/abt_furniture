import ClientPage from './ClientPage'

export const revalidate = 10 // ISR

export default async function Home() {
    const res = await fetch('http://127.0.0.1:8000/api/products', {
        next: {revalidate: 10},
    })
    const products = await res.json()

    return <ClientPage initialData={products}/>
}
