import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import ReactQueryProvider from './react-query-provider'

export const metadata: Metadata = {
  title: 'АБТ кухни',
  description: 'Сгенерировано с помощью create next app',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Header/>
      <main>{children}</main>
    </ReactQueryProvider>
  )
}
