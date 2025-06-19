import type { Metadata } from 'next'
import './globals.css'
import { montserrat, orelegaOne } from './fonts'

export const metadata: Metadata = {
  title: 'АБТ - мебель для кухни',
  description: 'Сгенерировано с помощью create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    <body className={`${orelegaOne.variable} ${montserrat.variable} antialiased`}>
    {children}
    </body>
    </html>
  )
}
