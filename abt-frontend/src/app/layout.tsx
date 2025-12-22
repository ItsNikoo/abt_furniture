import type { Metadata } from 'next'
import './globals.css'
import { inter, montserrat } from './fonts'

export const metadata: Metadata = {
  title: 'АБТ - мебель для кухни',
  description: 'Мебельная фабрика АБТ. Стиль и качество с 2002 года',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
    {children}
    </body>
    </html>
  )
}
