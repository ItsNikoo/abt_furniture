import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import ReactQueryProvider from './react-query-provider'
import Footer from "@/components/site/Footer"

export const metadata: Metadata = {
  title: 'АБТ кухни ',
  description: 'Сгенерировано с помощью create next app',
  icons: {
    icon: "/favicon.ico",
  }
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Header/>
      <main>{children}</main>
      <Footer />
    </ReactQueryProvider>
  )
}
